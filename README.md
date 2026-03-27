# 🛡️ Gmail Janitor: Operational Triage & High-Volume Cleanup (V9.0)

An enterprise-grade Google Apps Script designed for high-volume professionals and IT leaders to reclaim their inboxes from 20,000+ email backlogs.

## ✨ Key Features
* **Inbox Shield:** Programmatically prevents the deletion of any mail sitting in your Primary Inbox.
* **Batch Processing:** Handles 500-thread "gulps" per hour to stay under Google’s 6-minute execution limit.
* **Multi-Layer Triage:** Automated categorization for Work, Family, Career, and Training.
* **KPI Dashboard:** Daily reports showing success rates and backlog depth.
* **Training Stack:** Native support for CWCT, O'Reilly, Percipio, Pluralsight, and more.

## 🛠️ Quick Start
1. Create a new project at [script.google.com](https://script.google.com).
2. **Enable Gmail API:** Click **+** next to Services > Gmail API > Add.
3. Copy the code from `Code.gs` in this repo and paste it into your project.
4. Customize the `safeDomains` list with your specific domains.
5. Set an **Hourly Trigger** for the `autoCleanAndOrganize` function.

---
**Author:** Michael Harmon, DHA | Operational Strategist


🛡️ Gmail Janitor: High-Volume Operational Triage Guide (V9.0)
A Strategy for Reclaiming Your Inbox and Mental Bandwidth
1. The Strategy: Why This Works
Standard Gmail filters are static. This script is a Digital Assistant that looks at your email every hour, decides if it’s "Noise" or "Signal," and files it accordingly.
●	The "Safety Firewall": This script is hard-coded to never touch anything in your Primary Inbox. It only cleans the "back rooms" (Promotions/Social tabs) of your Gmail.
________________________________________
2. Step-by-Step Implementation
Step 1: Initialize the Script
1.	Go to script.google.com and click + New Project.
2.	Rename the project to Gmail Janitor V9.
Step 2: Enable the Gmail API (Crucial)
1.	On the left-hand menu, click the + symbol next to Services.
2.	Scroll down to Gmail API, click it, and then click Add.
Step 3: Insert the Master Code
Replace all text in the editor with the code below. Note: Update the safeDomains and rules on Lines 15-25 with your specific workplace or school domains.
JavaScript
/**
 * GMAIL JANITOR: UNIVERSAL EDITION (V9.0)
 * Logic: High-Speed Batching + Inbox Firewall + KPI Dashboard.
 */

function autoCleanAndOrganize() {
  var startTime = new Date();

  // --- STEP 1: YOUR PROTECTIONS ---
  var safetyShield = '-in:inbox -is:starred -label:01_Action_Required';
  
  // CUSTOMIZE THESE: Change to your actual workplace and family emails
  var safeDomains = '-from:your-employer.com -from:your-school.edu ' +
                    '-from:spouse@email.com -from:child@email.com ' +
                    '-from:utility-provider.com';

  var purgeQuery = '(category:promotions OR category:social) ' + safetyShield + ' ' + safeDomains + ' older_than:1d';
  var stats = { deleted: 0, labeled: 0, backlog: 0 };

  try {
    // Check backlog (max 500)
    var backlogThreads = GmailApp.search(purgeQuery, 0, 500);
    stats.backlog = backlogThreads.length;

    // Batch purge (100 items per run to clear the backlog)
    var purgeThreads = GmailApp.search(purgeQuery, 0, 100);
    if (purgeThreads.length > 0) {
      stats.deleted = purgeThreads.length;
      GmailApp.moveThreadsToTrash(purgeThreads);
    }

    // --- STEP 2: TRIAGE RULES ---
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

        // Label as "Action Required" only if currently in the Inbox
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
             "This report is filed under '00_Janitor_Reports'.";
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), "[JANITOR KPI] Activity Detected", body);
}

Step 4: Configure the Hourly Trigger
1.	Click the Alarm Clock icon (Triggers) on the left sidebar.
2.	Click + Add Trigger.
3.	Choose: autoCleanAndOrganize -> Head -> Time-driven -> Hour timer -> Every hour.
4.	Click Save and authorize the script when prompted.
________________________________________
3. Troubleshooting FAQ
●	"Unsafe App" Warning: Click Advanced -> Go to Gmail Janitor (unsafe). This is normal for private scripts you've created yourself.
●	Backlog Speed: If you have 20,000+ emails, it will take roughly 40 hours to fully catch up, as the script processes 500 items per hourly run.


