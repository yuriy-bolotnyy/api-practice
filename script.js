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

fetchData(10, endpoint)
    .then(data => {
        dataSet = data;
        // log(`final dataset: ${dataSet}`)
        // calback(dataSet)
    });

const getDataArray = (callback) => {
    fetchData(10, endpoint)
                    .then(data => {
                        dataSet = data;
                        // log(`final dataset: ${dataSet}`)
                        callback(dataSet)
                    });
    }

const processData = (dataSet) => {
    log(`><><><><><> process dataset: ${dataSet}`)
}

getDataArray(processData)                    

