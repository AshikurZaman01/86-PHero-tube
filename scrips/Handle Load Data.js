
    const handleLoadData = async (categoryId) => {
            
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();

        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

            // show the error message 
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerHTML = '';

        if (data.data.length === 0) {
            

            // create error message div
            const noNewsMessage = document.createElement('div');
            errorMessage.classList.remove('hidden');
            noNewsMessage.innerHTML = `
            <div>
            <img src="Resources/Icon.png" alt="Your Image" class="mx-auto">
            <h1 class="text-3xl font-bold md:text-normal" md:text-sm>Opps!! sorry, There is no content here</h1>
            </div>`;
            errorMessage.appendChild(noNewsMessage);
            // create error message div end
        } else {
            
            // sort by view button
            const sortData = [...data.data];

            const sortByViewButton = document.getElementById('sort-by-view');
            sortByViewButton.addEventListener('click', () => {
                sortData.sort((a, b) => {
                    const viewsA = parseInt(a.others.views.replace("K", "")) * 1000;
                    const viewsB = parseInt(b.others.views.replace("K", "")) * 1000;
                    return viewsB - viewsA;
                });

                // Call updateLoadData function 
                updateLoadData(sortData);
            });
            // sort by view button end

            updateLoadData(data.data);
            errorMessage.classList.add('hidden');
        }
    };

    const updateLoadData = (sortData) => {
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

        sortData.forEach(news => {
            
            // show all the load data
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="shadow-lg rounded-md">
            <div class="relative">
                <img style="width: 100%; height: 200px;" src="${news.thumbnail}" alt="Thumbnail image" class="w-full h-45 object-cover thumbnail-image">
                <p class="absolute bottom-[30px] right-[12px] z-10 text-white bg-black bg-opacity-70 p-2 text-[10px] rounded">${convertTime(news.others.posted_date)}</p>
            </div>
            <div class="p-3">
                <div class="flex items-center space-x-2">
                    <img src="${news.authors[0].profile_picture}" class="w-8 h-8 rounded-full">
                    <h3 class="text-lg font-semibold">${news.title}</h3>
                </div>
                <div class="ml-10 my-2"> 
                    <p class="text-gray-700 flex items-center space-x-1">
                    <span>${news.authors[0].profile_name}</span>
                    <span class="text-blue-500">
                    ${news.authors[0].verified? ` <img width="20" height="20" src="https://img.icons8.com/color/48/verified-badge.png" alt="verified-badge"/>` : ""}
                    
                    </span>
                </p>
                <span class="text-gray-500 text-[15px]">${news.others.views} views</span>
            </div>
            </div>
        </div>
            `;
            cardContainer.appendChild(div);
        });
    };
