log = console.log;

log("API practice")

const requestAsync = async (endpoint) => {
    const response = await fetch(endpoint)
    log(`endpoint: ${endpoint}`)

    if (response.status !== 200) {
        throw new Error(`cannot fetch data: error code: ${response.status}`);
    }

    const data = await response.json()
    // log('Awaited response: ', data)
    return data
};

const fetchData = async (maxPages, endpoint) => {
    let dataArray = [];
    for (let i = 1; i <= maxPages; i++) {
        const requestResult = await requestAsync(endpoint + `&page=${i}`)
                                .then(data => {
                                    // log(`<<<-- ${i} --<<< data (${data.length}): `, data)
                                    if (data.length > 0) {
                                        // dataArray = dataArray.concat(data);
                                        dataArray = [...dataArray, ...data];
                                    }
                                    // log(`dataArray after ${i}: `, dataArray)
                                })
                                .catch(err => log('<<<+++<< reject: ', err.message))
    }

    return dataArray;
}

const endpoint = 'https://picsum.photos/v2/list?limit=1000';

// const test = requestAsync(endpoint)
//     .then(data => log('<<<---<<< data: ', data))
//     .catch(err => log('<<<+++<< reject: ', err.message))

let dataSet = []

// fetchData(10, endpoint)
//     .then(data => {
//         dataSet = data;
//         // log(`final dataset: ${dataSet}`)
//         // calback(dataSet)
//     });

const getDataArray = (callback) => {
    fetchData(1, endpoint)
                    .then(data => {
                        dataSet = data;
                        // log(`final dataset: ${dataSet}`)
                        callback(dataSet)
                    });
    }

const processData = (dataSet) => {
    // log(`><><> 000 <><><> process dataset: ${dataSet}`)
    startApp(dataSet)
}

const imagesDiv = document.querySelector("body > div.images");

// imagesDiv.addEventListener('load', () => {
//     alert("The images were loaded")
// })

const addImage = (imgElement) => {
    
    imagesDiv.append(imgElement);
}

const createImage = (url) => {
    const newImgElement = document.createElement('img');
    newImgElement.src = url;
    
    return newImgElement
}

const hideElement = (el) => {
    log('Hiding element: ', el)

    el.style.display="none";

    // log('classlist before:', el.classList)
    // el.classList.add('hidden');
    // log('classlist after:', el.classList)
}

const unhideElement = (el) => {
    el.style.display="";
}

const fetchBtn = document.querySelector('div.search > button');
const fetchProgessSpinner = document.querySelector('div.search >div.progressSpinner');

onFetchBtnPress = () => {
    log('Fetch button clicked')

    hideElement(fetchBtn)
    unhideElement(fetchProgessSpinner)

    // setTimeout(unhideElement(fetchBtn), 5000)

    // setTimeout(() => {
    //     console.log("Delayed for 1 second.");
    //     hideElement(fetchProgessSpinner)
    //   }, "5000")

    setTimeout(() => {hideElement(fetchProgessSpinner)}, 7000)



    getDataArray(processData)  

   
}

fetchBtn.addEventListener('click', onFetchBtnPress)



const startApp = (dataSet) => {
    log(`><><> start app dataset <><><> process dataset: ${dataSet}`)
    dataSet.forEach(element => {
        ({id, author, width, height, url, download_url} = element)
        // Destructure it
            // author:
            // 'Alejandro Escamilla'
            // download_url:
            // 'https://picsum.photos/id/0/5616/3744'
            // height:
            // 3744
            // id:
            // '0'
            // url:
            // 'https://unsplash.com/photos/yC-Yzbqy7PY'
            // width:
            // 5616
        
        log(`element > id: ${id} | author: ${author}, width: ${width}, height: ${height}, url: ${url}, download_url: ${download_url}`)

        addImage(createImage(download_url))
     
    });

    // window.onload = (event) => {
    //     console.log('page is fully loaded');
    // };  
    
}




// getDataArray(processData)   