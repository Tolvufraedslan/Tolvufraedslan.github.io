document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/courses') // Adjust URL if deployed
        .then(response => response.json())
        .then(courses => {
            const courseList = document.getElementById('courses-list');
            courseList.innerHTML = courses.map(course => `
                <div class="course">
                    <h3>${course.name}</h3>
                    <p>${course.description}</p>
                    <p><strong>Duration:</strong> ${course.duration} hours</p>
                    <p><strong>Price:</strong> ${course.price} kr</p>
                    <button onclick="enroll(${course.id})">Register</button>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error fetching courses:', error));
});

function enroll(courseId) {
    fetch('http://localhost:3000/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, course_id: courseId }) // Replace with actual user ID
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error enrolling:', error));
}
