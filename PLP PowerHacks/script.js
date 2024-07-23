document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appointment-form');
    const appointmentsList = document.getElementById('appointments-list');

    // Load appointments from the server
    const loadAppointments = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/appointments');
            const appointments = await response.json();
            appointmentsList.innerHTML = appointments.map(app => <li>${app.date} at ${app.time}</li>).join('');
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    loadAppointments();

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const date = document.getElementById('appointment-date').value;
        const time = document.getElementById('appointment-time').value;

        try {
            const response = await fetch('http://localhost:3001/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, time })
            });
            const newAppointment = await response.json();
            const listItem = document.createElement('li');
            listItem.textContent = ${newAppointment.date} at ${newAppointment.time};
            appointmentsList.appendChild(listItem);
            form.reset();
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    });

    // Video consultation setup
    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');

    let localStream;
    let peerConnection;

    const startVideo = async () => {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;

            peerConnection = new RTCPeerConnection();
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });

            peerConnection.ontrack = (event) => {
                remoteVideo.srcObject = event.streams[0];
            };

            // For demonstration purposes, you can add signaling code here to exchange connection information with another peer

        } catch (error) {
            console.error('Error accessing media devices.', error);
        }
    };

    startVideo();
});