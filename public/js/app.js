const divInstall = document.getElementById('installContainer')
const InstallPWA = document.getElementById('InstallPWA')
const ConnectionState = document.getElementById('ConnectionState')

window.addEventListener("offline", () => {
    ConnectionState.classList.toggle('hidden', false)
})
window.addEventListener("online", () => {
    ConnectionState.classList.toggle('hidden', true)
})

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
}

window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event
    divInstall.classList.toggle('hidden', false)
})

InstallPWA.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt
    if (!promptEvent) {
        return
    }
    promptEvent.prompt()
    window.deferredPrompt = null
    divInstall.classList.toggle('hidden', true)
})