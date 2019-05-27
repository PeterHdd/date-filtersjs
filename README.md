# DATE-FILTERSJS - Combination of Filter and Date

![Release](https://img.shields.io/github/release/peterhdd/date-filtersjs.svg)
![Release Date](https://img.shields.io/github/release-date/peterhdd/date-filtersjs.svg)
![Last Commit](https://img.shields.io/github/last-commit/peterhdd/date-filtersjs.svg)
![License](https://img.shields.io/github/license/peterhdd/date-filtersjs.svg)

## Introduction

This is a javascript library, the main purpose of this library is to easily apply filter on specific date range and apply filter on any attribute.

## Installation

To build your project using Webpack or similar builders, install packages from NPM:

```
npm i date-filtersjs
```
import as follows:
```js
import { Filter } from 'date-filtersjs/filter/filter';
import { Dates }  from 'date-filtersjs/dates/dates';
```

Or if you are not using a bundler, you can do the following:
```js
<script type="module">
import { Filter } from 'https://cdn.jsdelivr.net/npm/date-filtersjs@1.0.0/filter/filter.min.js'
import { Dates }  from 'https://cdn.jsdelivr.net/npm/date-filtersjs@1.0.0/dates/dates.js';
</script>
```

## Usage

### Example User object

```js
let obj = [
    {
        "name" : "userx",
        "age"  : "20",
        "date" : "05/25/2019"
    },
    {
        "name" : "usery",
        "age"  : "21",
        "date" : "05/24/2019"
    },
    {
        "name" : "userg",
        "age"  : "21",
        "date" : "05/31/2019"
    },
    {
        "name" : "userz",
        "age"  : "21",
        "date" : "06/03/2019"
    },
    {
        "name" : "userw",
        "age"  : "21",
        "date" : "26/05/2019"
    }
];
```

### Filter

```js
let filter = new Filter(obj);                                            // initialize filter
filter.filterBy("name","userz").result();                                // Filter by an attribute
filter.where("name","==","userz").where("age","==","21").result();       // compound filter (AND), valid operators that can be used (==, !=, <= , >=)

filter.filterByToday("date").result();                                    // filters the date by today
filter.filterByYesterday("date").result();                                // filters the date by yesterday
filter.filterByCurrentWeek("date").result();                              // filters the date by first and last day of the week
filter.filterByCurrentMonth("date").result();                             // filters the date by current month
filter.filterByNextWeek("date").result();                                 // filters the date by next week
filter.filterByNextMonth("date").result();                                // filters the date by next month
filter.filterByLastWeek("date").result();                                 // filters the date by last week

filter.filterByNextThirtyDays("date").result();                           // filters the date by next thirty days
filter.filterByLastSevenDays("date").result();                            // filters the date by last seven days
filter.filterByLastThirtyDays("date").result();                           // filters the date by last thirty days
filter.filterByLastSixtyDays("date").result();                            // filters the date by last sixty days 

filter.filterByLastNinetyDays("date").result();                           // filters the date by last ninety days
filter.filterByMonthToDate("date").result();                              // filters the date by month to date
filter.filterByLastMonth("date").result();                                // filters the date by last month
```
**Note:** All of the above will return the filtered array

### Date

You can also retrieve the date ranges, the following are the different methods available:

```js

let date = new Dates();                                                  // initialize
date.setFormat("MM/DD/YYYY");                                            // set the format, valid formats ("MM/DD/YYYY", "MM-DD-YYYY", "DD/MM/YYYY")
date.getFormat();                                                        // retrieve format

// both methods below will return an object like this {date: "26/05/2019"}, you can access the date using "date" attribute

date.today();                                                           // retrieve today's date
date.yesterday();                                                       // retrieve yesterday's date

// all methods below will return an object like this {first: "26/05/2019", last: "01/06/2019"}, you can access the first and last date by using "first" and "last attribute

date.currentWeek();                                                     // retrieve first and last day of the week
date.currentMonth();                                                    // retrieve first and last day of the month
date.nextWeek();                                                        // retrieve first and last day of next week

date.nextMonth();                                                       // retrieve first and last day of next month
date.lastWeek();                                                        // retrieve first and last day of last week
date.nextThirtyDays();                                                  // retrieve first and last day of the next thirty days

date.lastSevenDays();                                                   // retrieve first and last day of last seven days
date.lastThirtyDays();                                                  // retrieve first and last day of last thirty days
date.lastSixtyDays();                                                   // retrieve first and last day of the last sixty days

date.lastNinetyDays();                                                  // retrieve first and last day of the last ninety days
date.monthToDate();                                                     // retrieve first day of the month and current day
date.lastMonth();                                                       // retrieve first and last day of last month

date.incrementBy("40"));                                                // retrieve current day and last day according to the increment number provided
date.decrementBy("40"));                                                // retrieve current day and last day according to the decrement number provided
