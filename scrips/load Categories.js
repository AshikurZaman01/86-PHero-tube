
// Handle categories
const handleCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const buttons = data.data;
    const categoriesButtons = document.getElementById('categories-buttons');

    buttons.forEach((button, index) => {
       
        // Create buttons with categories
        const createButton = document.createElement('button');
        createButton.classList.add("bg-gray-300", "px-4", "py-2", "rounded", "mx-2", "active-buttons");
        createButton.innerHTML = `${button.category}`;
        
        createButton.addEventListener('click', () => {
            handleLoadData(button.category_id);
            
            // Remove active class from all buttons
            document.querySelectorAll('.active-buttons').forEach(btn => {
                btn.classList.remove('bg-red-500');
                btn.classList.add('bg-gray-300');
            });
            
            // Add active class to the clicked button
            createButton.classList.remove('bg-gray-300');
            createButton.classList.add('bg-red-500');
        });

        categoriesButtons.appendChild(createButton);

        // Set  first button active
        if (index === 0) {
            createButton.click();
        }
    });
};

handleCategories();
