# Gwen - GitHub Wiki Notifications

Gwen is a service for sending email notifications whenever a GitHub wiki is
modified.

<!-- http://gwen.heroku.com -->

---

## Setup

*Note: Gwen does not support node 0.10 at this time,
due to an [error with leveldb](https://github.com/my8bird/node-leveldb/issues/49).*

1. Clone this repo.

2. Run `npm install`.

3. Install [foreman](https://github.com/ddollar/foreman)
or the full [Heroku Toolbelt](https://toolbelt.heroku.com/).

4. Create a file named `.env` in the root of your checkout.
This file will contain the configuration settings for your dev environment:

	```
	GMAIL_USER=you@gmail.com
	GMAIL_PASS=secret
	MAIL_FROM=notification@gwen.dev
	```

5. Run `foreman start`.
