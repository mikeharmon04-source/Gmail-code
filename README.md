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
