const fs = require('fs')
const csv = require('csv-parser')

// Delete usa.txt and canada.txt 
if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("File deleted successfully...")
    })
}
if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("File deleted successfully...")
    })
}

// Filter data of Canada & United States and write data to text file

const canada_data = [];
const usa_data = [];

fs.createReadStream('input_countries.csv').pipe(csv())
.on('data', (data) => {
    if (data.country === 'Canada') {
        canada_data.push(data);
    };
    if (data.country === 'United States') {
        usa_data.push(data);
    };
})

.on('end', () => {
    let canada = canada_data.map(row => {
        return `${row['country']},${row['year']},${row['population']}`;
    });

    let usa = usa_data.map(row => {
        return `${row['country']},${row['year']},${row['population']}`;
    });

    fs.writeFile('canada.txt',"country,year,population\n" + canada.join("\n"), (err) => {
        
        if(err) {
            console.log(err);
        }
    });
    fs.writeFile('usa.txt',"country,year,population\n" + usa.join("\n"), (err) => {
        if(err) {
            console.log(err);
        };
    });    
})

