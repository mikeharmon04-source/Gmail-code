/**
 * GMAIL JANITOR: UNIVERSAL EDITION (V9.0)
 * Author: Michael Harmon, DHA
 * Description: Automated triage for high-volume inboxes.
 */

function autoCleanAndOrganize() {
  var startTime = new Date();
  var safetyShield = '-in:inbox -is:starred -label:01_Action_Required';
  
  // CUSTOMIZE THESE: Change to your actual workplace and family domains
  var safeDomains = '-from:your-employer.com -from:your-school.edu ' +
                    '-from:spouse@email.com -from:child@email.com ' +
                    '-from:utility-provider.com';

  var purgeQuery = '(category:promotions OR category:social) ' + safetyShield + ' ' + safeDomains + ' older_than:1d';
  var stats = { deleted: 0, labeled: 0, backlog: 0 };

  try {
    var backlogThreads = GmailApp.search(purgeQuery, 0, 500);
    stats.backlog = backlogThreads.length;

    var purgeThreads = GmailApp.search(purgeQuery, 0, 100);
    if (purgeThreads.length > 0) {
      stats.deleted = purgeThreads.length;
      GmailApp.markThreadsRead(purgeThreads);
      GmailApp.moveThreadsToTrash(purgeThreads);
    }

    var rules = [
      {q: 'from:your-employer.com OR from:your-school.edu', n: '02_Work_School'},
      {q: 'from:spouse@email.com OR from:child@email.com', n: '03_Family'},
      {q: '(subject:"Application" OR "Recruiter" OR "myworkday")', n: '04_Career_Search'},
      {q: '(CWCT OR "ucertify" OR "udemy" OR "coursera" OR "oreilly" OR "percipio" OR "pluralsight")', n: '05_Training_Certs'},
      {q: 'subject:"JANITOR KPI"', n: '00_Janitor_Reports'}
    ];

    rules.forEach(rule => {
      var threads = GmailApp.search(rule.q, 0, 500);
      if (threads.length > 0) {
        var cLabel = GmailApp.getUserLabelByName(rule.n) || GmailApp.createLabel(rule.n);
        var aLabel = GmailApp.getUserLabelByName("01_Action_Required") || GmailApp.createLabel("01_Action_Required");
        cLabel.addToThreads(threads);
        stats.labeled += threads.length;
        var inboxThreads = threads.filter(t => t.isInInbox());
        if (inboxThreads.length > 0 && rule.n !== '00_Janitor_Reports') {
          aLabel.addToThreads(inboxThreads);
        }
      }
    });

    if (stats.deleted > 0 || stats.labeled > 0) {
      sendKpiReport(stats, startTime);
    }
  } catch (e) { Logger.log("Error: " + e); }
}

function sendKpiReport(stats, startTime) {
  var executionTime = ((new Date() - startTime) / 1000).toFixed(2);
  var body = "OPERATIONAL READINESS REPORT\n" +
             "==========================================\n" +
             " JUNK PURGED         | " + stats.deleted + "\n" +
             " ITEMS LABELED       | " + stats.labeled + "\n" +
             " BACKLOG QUEUE       | " + (stats.backlog >= 500 ? "500+" : stats.backlog) + "\n" +
             " EXECUTION TIME      | " + executionTime + "s\n" +
             "==========================================\n\n" +
             "Filed under '00_Janitor_Reports'.";
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), "[JANITOR KPI] Activity Detected", body);
}
