let deferredPrompt: Event | any;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});

const deferredPromptFunct = async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
            return true;
        }
        return false;
    }
}

export default deferredPromptFunct;