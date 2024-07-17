document.addEventListener('DOMContentLoaded', function() {
    const categoriesDiv = document.getElementById('categories');
    const popupBox = document.createElement('div');
    popupBox.classList.add('popup-box');
    document.body.appendChild(popupBox);

    // Function to fetch and display meals for a specific category
    function fetchAndDisplayMeals(category) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals) {
                    // Create a list to hold meal items
                    const mealsList = document.createElement('ul');
                    mealsList.classList.add('meals-list');

                    // Loop through meals and create list items
                    data.meals.forEach(meal => {
                        const mealItem = document.createElement('li');
                        mealItem.textContent = meal.strMeal;
                        mealsList.appendChild(mealItem);
                    });

                    // Clear existing meals list before appending new one
                    const existingMealsList = popupBox.querySelector('.meals-list');
                    if (existingMealsList) {
                        existingMealsList.remove();
                    }

                    // Append meals list to popup box
                    popupBox.appendChild(mealsList);

                    // Show popup box
                    popupBox.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
            });
    }

    // Fetch meal categories from TheMealDB API
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                // Create category list item element
                const categoryElement = document.createElement('li');
                categoryElement.classList.add('category');

                // Create image element for category thumbnail
                const img = document.createElement('img');
                img.src = category.strCategoryThumb;
                img.alt = category.strCategory;
                img.addEventListener('click', function() {
                    // Fetch and display meals for this category on click
                    fetchAndDisplayMeals(category.strCategory);
                });
                categoryElement.appendChild(img);

                // Create heading for category name
                const heading = document.createElement('h3');
                heading.textContent = category.strCategory;
                categoryElement.appendChild(heading);

                // Append category list item to categories list
                categoriesDiv.appendChild(categoryElement);
            });
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

    // Close popup box when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!popupBox.contains(event.target)) {
            popupBox.style.display = 'none';
        }
    });
});
