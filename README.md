🛡️ Gmail Janitor: Operational Triage & High-Volume Cleanup (V9.0)
An enterprise-grade Google Apps Script designed for high-volume professionals, academic faculty, and IT leaders to reclaim their inboxes from 20,000+ email backlogs.

🚀 The Problem
Standard Gmail filters are static and often fail when processing massive historical archives. Professionals frequently face:

System Timeouts: Processing 20,000+ emails in one go crashes standard scripts.

Label Overload: Difficulty distinguishing between "Promotions" and critical "Action Items."

Signal vs. Noise: Important career and training updates getting lost in retail blasts.

✨ Key Features
The Inbox Shield: Uses -in:inbox logic to ensure the script never touches primary mail.

Batch Processing: Handles 500-thread "gulps" per hour to bypass Google’s 6-minute execution limit.

Multi-Layer Triage: Automatically labels and categorizes Work, Family, Career, and Training.

Operational Dashboard: Delivers a daily KPI report with success rates and backlog depth.

Expanded Training Stack: Native support for CWCT, O'Reilly, Percipio, Pluralsight, and more.

🛠️ Installation & Setup
1. Initialize the Environment
Go to script.google.com and create a New Project.

Enable Gmail API: On the left sidebar, click the + next to Services, select Gmail API, and click Add.

2. Deployment
Replace the contents of Code.gs with the provided script.

Customize: Update the safeDomains and rules variables with your specific organizational and personal identifiers.

Run Manually: Click Run once to authorize the script (Click Advanced > Go to Gmail Janitor (unsafe) when prompted).

3. Automate the "Heartbeat"
Click the Triggers (Alarm Clock) icon.

Add a new trigger:

Function: autoCleanAndOrganize

Event Source: Time-driven

Type: Hour timer

Interval: Every hour

📊 The KPI Dashboard
The script generates an automated report filed under 00_Janitor_Reports including:

Pending Actions: Count of items currently requiring your attention.

Junk Purged: Total marketing/social threads moved to trash.

Backlog Queue: Visibility into how many threads remain in the "Deep Clean" queue.

Filter Efficiency: Percentage-based success rate of your triage rules.

👨‍💻 About the Author
Michael Harmon, DHA
Operational Strategist | IT Director | Program Manager
Bridging the gap between clinical strategy and technical execution through automation and cognitive load reduction.
