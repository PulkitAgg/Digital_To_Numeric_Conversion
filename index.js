const express = require('express');
const app = express();
const fs = require('fs');

/**
 * function return digit correspoding to pattern.
 * @param {*} pattern 
 */
function getDigit(pattern) {
    let val = ""
    switch (pattern) {
        case " _ | ||_|":
            val = 0;
            break;
        case "     |  |":
            val = 1;
            break;
        case " _  _||_ ":
            val = 2;
            break;
        case " _  _| _|":
            val = 3;
            break;
        case "   |_|  |":
            val = 4;
            break;
        case " _ |_  _|":
            val = 5;
            break;
        case " _ |_ |_|":
            val = 6;
            break;
        case " _   |  |":
            val = 7;
            break;
        case " _ |_||_|":
            val = 8;
            break;
        case " _ |_| _|":
            val = 9;
            break;
    }
    return val;
}

/**
 * Function for returning the number.
 * @param {*} lines array with three rows of input file which make a number.
 */

function getNumber(lines) {
    // Make array of each row which contains 3 character as a string.
    lines = lines.map(line => line.match(/.../g));
    // now lines will be array of array.

    // Combine the pieces of each digit-pattern together:
    let number = lines[0] ? lines[0].map((data, i) => data + lines[1][i] + lines[2][i])
        .map(getDigit)
        .join('') : '';
    return number;

}

app.get('/', (req, res) => {
    fs.readFile("./input_user_story_1.txt", 'utf8', function (err, data) {
        if (err) {
            res.json({
                error: true,
                data: 'There is an error in reading the file.'
            })
        } else {
            /**
             * Split the data usign new line.
             * lines will be array that contains each row of input file.
             */
            const lines = data.split('\n');
            var outPutFile = "";
            for (let count = 0; count < lines.length; count = count + 4) {
                outPutFile = `${outPutFile}${getNumber(lines.slice(count, count + 3))}\n`;
            }
            fs.writeFile('output_user_story_1.txt', outPutFile, (err) => {
                if (err) {
                    res.json({
                        error: true,
                        data: 'There is an error in writing the file.'
                    })
                } else {
                    res.json({
                        success: true,
                        data: 'Data parsed and saved successfully.'
                    });
                }
            })
        }
    });
});

app.listen(3000, function() {
    console.log('server start on 3000 port');
});