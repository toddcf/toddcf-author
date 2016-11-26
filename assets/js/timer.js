// Once jQuery is properly linked, add "on load" here.

// alert("timer.js is linked!");

// 30-second timer.  SEE 07-25 SIMPLE TIMER ACTIVITY.
setTimeout(popup, 1000 * 30);

// Pop-up modal inviting user to sign up for bonus content.
function popup() {
	// Change this alert to a customized modal:
    confirm("Would you like to receive free bonus content?");
    // And then link it to the MailChimp signup.
}

// Check if popup() has been called this session.  AJAX??
	// If yes, STOP.  DO NOT call popup().
	// If no, call popup().
		// Log that popup has been called.