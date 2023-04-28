browser.runtime.sendMessage({}, function (response) {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			// removes ad blocker notice
			const ad_notice = document.getElementById("adblock-wrapper");
			if (ad_notice instanceof HTMLElement) {
				ad_notice.remove();
			}
			// add download button
			let html = document.documentElement.innerHTML;
			let link = html.match(/fresources.sgp1.digitaloceanspaces.com\/.*\/.*\.pdf/g);
			if (link == null) {
				let detector = html.split(".pdf");
				if (detector.length > 1) {
					link = detector[0].split("https://").pop() + ".pdf";
				} else {
					console.log("No link found");
					return;
				}
			}
			let element = document.querySelector("body");
			let downloadButton = document.createElement("a");
			downloadButton.setAttribute("href", "https://" + link);
			downloadButton.setAttribute("style", "position : fixed; top: 0; right: 0; display: block; width: 100px; text-align: center; color: white; background-color: #007bff; padding: 15px; border-radius: 0 0 0 10px; font-weight: bold; text-decoration: none;");
			let newContent = document.createTextNode("Download");
			downloadButton.appendChild(newContent);
			element.appendChild(downloadButton);
			clearInterval(readyStateCheckInterval);
		}
	}, 10);
});
