const sleep = () => new Promise(resolve => setTimeout(resolve, 3000));

async function runAutomation() {
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.dws.de/MeinDWS/MeinProfil/#Settings";
    iframe.id = "targetFrame";
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    document.body.appendChild(iframe);

    await new Promise(resolve => iframe.onload = resolve);
    await sleep();

    try {
        let frameWindow = iframe.contentWindow;
        let frameDocument = iframe.contentDocument || iframe.contentWindow.document;

        frameWindow.__doPostBack('ctl00$ctl00$ctl12$MyProfileControl$ctl02$ctl00$ctl01$ctl00', '');
        
        await sleep();

        frameDocument = iframe.contentDocument || iframe.contentWindow.document;
        const emailInput = frameDocument.getElementById('ctl00_ctl00_ctl12_MyProfileControl_ctl02_ctl00_ctl01__email');
        
        if (emailInput) {
            emailInput.value = "rootxravi@gmail.com";
        }

        await sleep();

        frameWindow.WebForm_DoPostBackWithOptions(
            new frameWindow.WebForm_PostBackOptions(
                "ctl00$ctl00$ctl12$MyProfileControl$ctl02$ctl00$ctl01$ctl02", 
                "", true, "EmailSettingValidationGroup", "", false, true
            )
        );

    } catch (e) {
        console.error(e);
    }
}

runAutomation();
