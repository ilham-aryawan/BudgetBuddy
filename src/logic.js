/*
 - Checks if the "date" is in a valid format (MM/DD/YYYY)

    date - the date needed to be checked (string)
    MM - the correct month for verification (string)
    YYYY - the correct year for verification (string)

    return type: (bool)
*/
let ifValidDate = function(date, MM, YYYY)
{
    // 1. Checks if date is formatted correctly
    // 2. Checks if year is the same
    // 3. Check if month is the same
    // 4. Check if day within date is valid

    const daysInMonths = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    // Checks length
    if (date.length !== 10)
    {return false;}

    // Checks correct placement of slashes
    if (date[2] === new String("/") && date[5] === new String("/"))
    {return false;}

    // Checks if MM and YYYY is the same
    if (date.substr(0, 2) !== MM && date.substr(6,4) !== YYYY)
    {return false;}

    // Checks if DD is a number
    if (!(date[3] >= '0' && date[3] <= '9' && date[4] >= '0' && date[4] <= '9'))
    {return false;} 

    // Checks if DD in date is valid
    if (parseInt(date.substr(3, 2)) > parseInt(daysInMonths[parseInt(MM)]))
    {return false;}
    
    if (date[3] === "0" && date[4] === "0")
    {return false;}
    
    return true;
}


/* 
 - Tests if "value" is valid, ie string must be composed of all digits

    value - the value needed to be checked (string)

    return type: (bool)
*/
let ifValidValue = function(value)
{return /^\d+$/.test(value);}


/* 
- Deletes an entry from dataArr and the valueArr targetValue is date 
  (Assumes all parameters are valid)

    initBudget - initial budget (int)
    dateArr - array of dates (arr[string])
    valueArr - array of earns and spending (arr[int])
    displayArr  array of display values for chart (arr[int])
    targetValue - date searched for in dateArr (string)

    return type: (bool/None)
 */
let deleteEntry = function(initBudget, dateArr, valueArr, displayArr, targetValue) 
{
    
    for (let i = 0; i < dateArr.length; i++)
    {
        if (dateArr[i] === targetValue)
        {
            dateArr.splice(i, 1);
            valueArr.splice(i, 1);
            break;
        }
    }
    
    adjustDisplayArray(initBudget, displayArr,valueArr);
}


/* 
- Adds an entry into the data and value array 
  (Assumes all parameters are valid)

    initBudget - initial budget (int)
    dateArr - array of dates (arr[string])
    valueArr - array of earns and spending (arr[int])
    displayArr  array of display values for chart (arr[int])
    date - date wanting to be added/modified (string)
    value - value wanting to be added/modified (int)

    return type: (None)
*/
let addEntry = function(initBudget, dateArr, valueArr, displayArr, date, value)
{
    if (dateArr.length === 0)
    {
        dateArr.push(date);
        valueArr.push(value);
    }
    
    
    else
    {
        
        if (date < dateArr[0])
        {
            dateArr.unshift(date);
            valueArr.unshift(value);
        }
        
        else
        {
            for (let i = 0; i < dateArr.length; i++)
            {
                if (dateArr[i] === date)
                {
                    valueArr[i] += value;
                    break;
                }
                
                else if (i >= 1 && dateArr[i] > date && date > dateArr[i - 1])
                {
                    dateArr.splice(i, 0, date);
                    valueArr.splice(i, 0, value);
                    break;
                }
            }
        }
    }
    
    adjustDisplayArray(initBudget, displayArr,valueArr);
}
    
    
    
/*
- Adjusts the display array's values (This is an internal function don't actually use it)
    
    initBudget - starting budget of the month (int)
    dispArr - array of current balance (arr[int])
    valueArr - array of earns and spending (arr[int])

    return type: (None)
*/
let adjustDisplayArray = function(initBudget, displayArr, valueArr)
{
    displayArr.length = 0;

    let currVal = initBudget;
    for (let i = 0; i < valueArr.length; i++)
    {
        currVal += valueArr[i];
        displayArr.push(currVal);
    }
}