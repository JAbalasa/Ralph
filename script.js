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

    // Function to fetch and display categories, areas, and ingredients
    function fetchAndDisplayList(apiEndpoint, listType) {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                if (data[listType]) {
                    // Create a list to hold items
                    const list = document.createElement('ul');
                    list.classList.add('list-items');

                    // Loop through items and create list items
                    data[listType].forEach(item => {
                        const listItem = document.createElement('li');
                        listItem.textContent = item[`str${listType.charAt(0).toUpperCase() + listType.slice(1)}`];
                        listItem.addEventListener('click', function() {
                            // Fetch and display meals for this category on click
                            fetchAndDisplayMeals(item[`str${listType.charAt(0).toUpperCase() + listType.slice(1)}`]);
                        });
                        list.appendChild(listItem);
                    });

                    // Clear existing list before appending new one
                    const existingList = popupBox.querySelector('.list-items');
                    if (existingList) {
                        existingList.remove();
                    }

                    // Append list to popup box
                    popupBox.appendChild(list);

                    // Show popup box
                    popupBox.style.display = 'block';
                }
            })
            .catch(error => {
                console.error(`Error fetching ${listType}:`, error);
            });
    }

    // Fetch meal categories from TheMealDB API
    fetchAndDisplayList('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'categories');

    // Fetch meal areas from TheMealDB API
    fetchAndDisplayList('https://www.themealdb.com/api/json/v1/1/list.php?a=list', 'areas');

    // Fetch meal ingredients from TheMealDB API
    fetchAndDisplayList('https://www.themealdb.com/api/json/v1/1/list.php?i=list', 'ingredients');

    // Close popup box when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!popupBox.contains(event.target)) {
            popupBox.style.display = 'none';
        }
    });

    // Close popup box when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            popupBox.style.display = 'none';
        }
    });

    // Close popup box when clicking on close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', function() {
        popupBox.style.display = 'none';
    });
    popupBox.appendChild(closeButton);
});
