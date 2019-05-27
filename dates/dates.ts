

enum DateFormat
{
    forwardSlashMMDDYYYY   = "MM/DD/YYYY",
    dashMMDDYYYY           = "MM-DD-YYYY",
    forwardSlashDDMMYYYY   = "DD/MM/YYYY"
}


export class Dates
{
    private dateSymbol;
    private dateFormat;
    private date;
    private day  : any;
    private month: any;
    private year : any;
    private formatDates: any;

    constructor()
    {
        this.date  = new Date();
        this.day   = this.date.getDate();
        this.month = this.date.getMonth()+1;
        this.year  = this.date.getFullYear();
    }

    /**
     * Set the format of your dates
     */
    setFormat(dateFormat : DateFormat)
    {
        switch (dateFormat) 
        {
            case "MM/DD/YYYY":
                this.dateSymbol = {symbol : '/', position : "Day second"};
                break;
            case "MM-DD-YYYY":
                this.dateSymbol = {symbol : '-', position : ""};
                break;
            case "DD/MM/YYYY":
                this.dateSymbol = {symbol : '/', position : "Day first"};
                break;
            default:
                throw new Error("Invalid date format");
        }
        this.dateFormat = dateFormat;
    }

    /**
     * get the format
     */
    getFormat()
    {
        return this.dateFormat;
    }

    /**
     * get the today's date
     */
    today()
    {
        let dateResult  = {first : this.day}
        let format      = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the yesterday's date
     */
    yesterday()
    {
        let day         = this.day - 1;
        let dateResult  = {first : day}
        let format      = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the current week first and last date
     */
    currentWeek()
    {
        let  first : number;
        let last   : any;
         first          = this.day - this.date.getDay();
         last         = first + 6;
        let daysinMonth  = new Date(this.year, this.month, 0).getDate();
        if(last > daysinMonth)
        {
            last = last - daysinMonth;
            last = {date : last, month : this.date.getMonth()+2}
            var dateResult   = {first : first, last : last}
        }
        else
        {
            var dateResult   = {first : first, last : last}
        }
        let format      = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the current month first and last date
     */
    currentMonth()
    {
        let last         = new Date(this.year, this.month, 0).getDate();
        let dateResult   = {first : '1', last : last}
        let format       = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the next month first and last date
     */
    nextMonth()
    {
        let  first : any;
        let last   : any;
        let nextMonth    = this.date.getMonth()+2;
        let year         = this.date.getFullYear();
        last         = new Date(year, nextMonth, 0).getDate();
        if(nextMonth == 12)
        {
            year       = this.date.getFullYear() + 1;
             last      = new Date(year, nextMonth, 0).getDate();
        }
        first            = {date  : '1',  month : nextMonth, year : year}
        last             = {date  : last, month : nextMonth, year : year}
        let dateResult   = {first : first, last : last}
        let format       = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the next week first and last date
     */
    nextWeek()
    {
        let  first : any;
        let last   : any;
         first        = this.day - this.date.getDay() + 7;
         last         = first + 6;
        let daysinMonth  = new Date(this.year, this.month, 0).getDate();
         if(first > daysinMonth && last > daysinMonth)
        {
            first  = first - daysinMonth;
            last   = last  - daysinMonth;
            first  = {date : first, month : this.date.getMonth()+2}
            last   = {date  : last, month  : this.date.getMonth()+2}
            var dateResult   = {first : first, last : last}
        }
        else if(last > daysinMonth)
        {
            last = last - daysinMonth;
            last = {date : last, month : this.date.getMonth()+2}
            var dateResult   = {first : first, last : last}
        }
        else
        {
            var dateResult   = {first : first, last : last}
        }
        let format       = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the last week first and last date
     */
    lastWeek() 
    {
        let  first : any;
        let last   : any;
        let lastMonth : any;
        let dateResult : any;
        if(this.day <= 7)
        {
            lastMonth                = this.date.getMonth();
            let daysinMonth          = new Date(this.year, this.month, 0).getDate();
            let lastDay              = this.day - this.date.getDay();
            let daysPassed           = daysinMonth - lastDay + 1;
            let daysLeft             = daysinMonth - daysPassed;
            let numOfDaysInWeek      = 7 - daysLeft;
            let daysInPreviousMonth  = new Date(this.year, lastMonth, 0).getDate();
             first                = daysInPreviousMonth - numOfDaysInWeek +1;
            var lastDays             = first + 6;
            first            = {date : first, month : lastMonth}
             dateResult   = {first : first, last : lastDays}
            if(lastDays > daysinMonth)
            {
                lastDays = lastDays - daysinMonth;
                lastDays = {date : lastDays, month : this.date.getMonth()+2}
                 dateResult   = {first : first, last : lastDays}
            }
            else
            {
                 dateResult   = {first : first, last : lastDays}
            }
        }
        else
        {
            let first        = this.day - this.date.getDay() -7;
             last         = first + 6;
            let daysinMonth  = new Date(this.year, this.month, 0).getDate();
            if(last > daysinMonth)
            {
                last = last - daysinMonth;
                last = {date : last, month : this.date.getMonth()+2}
                 dateResult   = {first : first, last : last}
            }
            else
            {
                 dateResult   = {first : first, last : last}
            }
        }
        let format      = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the next thirty days date
     */
    nextThirtyDays()
    {
        let date         = this.retrieveDates(30,'+');
        let first        = {date : date.first, month : date.month, year : date.year}
        let dateResult   = {first : date.last, last : first}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the last seven days date
     */
    lastSevenDays()
    {
        let date         = this.retrieveDates(7,'-');
        let first        = {date : date.first, month : date.month, year : date.year}
        let dateResult   = {first : first, last : date.last}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the last thirty days date
     */
    lastThirtyDays()
    {
        let date         = this.retrieveDates(30,'-');
        let first        = {date : date.first, month : date.month, year: date.year}
        let dateResult   = {first : first, last : date.last}
        let format    = this.resultDateFormat(dateResult);
        return format;

    }

    /**
     * get the last sixty days date
     */
    lastSixtyDays()
    {
        let date         = this.retrieveDates(60,'-');
        let first        = {date : date.first, month : date.month, year: date.year}
        let dateResult   = {first : first, last : date.last}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the last ninety days date
     */
    lastNinetyDays()
    {
        let date         = this.retrieveDates(90,'-');
        let first        = {date : date.first, month : date.month, year: date.year}
        let dateResult   = {first : first, last : date.last}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * get the first day of the month and current day
     */
    monthToDate()
    {
        let first        = 1;
        let last         = this.day;
        let dateResult   = {first : first, last : last}
        let format       = this.resultDateFormat(dateResult);
        return format;
    }

     /**
     * get the last month first and last day
     */
    lastMonth()
    {
        let first : any;
        let last  : any;
         first = 1;
        let previousMonth        = this.date.getMonth();
        let year                 = this.date.getFullYear();
        let daysInPreviousMonth  = new Date(year, this.date.getMonth(), 0).getDate();
        if( previousMonth == 12)
        {
            year                 = this.date.getFullYear() -1;
            daysInPreviousMonth  = new Date(year, this.date.getMonth(), 0).getDate();
        }
         last  = daysInPreviousMonth;
        last      = {date : last, month : this.date.getMonth(), year : year }
        first     = {date : first, month : this.date.getMonth(), year : year }
        let dateResult   = {first : first, last : last}
        let format       = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * increment day by specific days
     */
    incrementBy(num)
    {
        if(typeof num != 'number')
        {
            num = parseInt(num);
        }
        let date         = this.retrieveDates(num,'+');
        let first        = {date : date.first, month : date.month, year : date.year}
        let dateResult   = {first : date.last, last : first}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }

    /**
     * decrement day by specific days
     */
    decrementBy(num)
    {
        if(typeof num != 'number')
        {
            num = parseInt(num);
        }
        let date         = this.retrieveDates(num,'-');
        let first        = {date : date.first, month : date.month, year: date.year}
        let dateResult   = {first : first, last : date.last}
        let format    = this.resultDateFormat(dateResult);
        return format;
    }


    private resultDateFormat(dateResult)
    {
        let firstDay  = dateResult.first;
        let month = this.date.getMonth()+1;
        if(typeof dateResult.last !== "undefined")
        {
            if(typeof dateResult.last == 'object')
            {
              if(dateResult.last.date < 10) 
                 dateResult.last.date = '0'+ dateResult.last.date;

              if(dateResult.last.month < 10) 
                 dateResult.last.month ='0'+ dateResult.last.month;

              var lastDate = this.formatMonthAndDay(dateResult.last);
            }
            else
            {
              if(dateResult.last < 10) 
                dateResult.last = '0'+ dateResult.last;

              if(month < 10) 
                month ='0'+ month;
                this.month = month;
                month  = 5 - month;

              var lastDate = this.dateFormatting(dateResult.last);
              month = this.date.getMonth()+1
            }
        }
        if(typeof dateResult.first == 'object')
        {
          if(dateResult.first.date < 10) 
             dateResult.first.date = '0'+ dateResult.first.date;

          if(dateResult.first.month < 10) 
             dateResult.first.month ='0'+ dateResult.first.month;

          var firstDate = this.formatMonthAndDay(dateResult.first);
        }   
        else
        {
            if(firstDay < 10) 
              firstDay = '0'+ firstDay;
              if(month < 10) 
              month ='0'+ month;

              this.month = month;

            var firstDate = this.dateFormatting(firstDay);
        }

         return typeof lastDate != "undefined" ? {first: firstDate, last : lastDate} : {date : firstDate} ;
    }

private dateFormatting(date)
    {
        if(typeof this.dateSymbol == "undefined")
        {
            this.dateSymbol = {symbol : '/', position : "Day first"};
        }
        if(this.dateSymbol.position == "Day first")
        {
            this.formatDates = date + this.dateSymbol.symbol + this.month + this.dateSymbol.symbol + this.year;
        }
        else if(this.dateSymbol.position == "Day second")
        {
            this.formatDates = this.month + this.dateSymbol.symbol + date + this.dateSymbol.symbol + this.year;
        }
        else
        {
            this.formatDates = this.month + this.dateSymbol.symbol + date + this.dateSymbol.symbol + this.year;
        }
        return this.formatDates;
    }

private formatMonthAndDay(result)
    {
        if(typeof this.dateSymbol == "undefined")
        {
            this.dateSymbol = {symbol : '/', position : "Day first"};
        }
        if(this.dateSymbol.position == "Day first")
        {
            if(typeof result.year !== "undefined")
            {
                this.formatDates = result.date + this.dateSymbol.symbol + result.month + this.dateSymbol.symbol + result.year;
            }
            else
            {
                this.formatDates = result.date + this.dateSymbol.symbol + result.month + this.dateSymbol.symbol + this.year;
            }
        }
        else if(this.dateSymbol.position == "Day second")
        {
            if(typeof result.year !== "undefined")
            {
                this.formatDates = result.month + this.dateSymbol.symbol + result.date + this.dateSymbol.symbol + result.year;
            }
            else
            {
                this.formatDates = result.month + this.dateSymbol.symbol + result.date + this.dateSymbol.symbol + this.year;
            }
        }
        else
        {
            if(typeof result.year !== "undefined")
            {
                this.formatDates = result.month + this.dateSymbol.symbol + result.date + this.dateSymbol.symbol + result.year;
            }
            else
            {
                this.formatDates = result.month + this.dateSymbol.symbol + result.date + this.dateSymbol.symbol + this.year;
            }
        }
        return this.formatDates;
    }

private retrieveDates(num,operator)
    {
        let last      = this.day;
        let date      = new Date();
        if(operator == '+')
        {
            date.setDate(this.day + num);
        }
        else
        {
            date.setDate(this.day - num); 
        }
        let dates        = date.toISOString().substring(0, 10);
        let splitDate    = dates.split('-');
        let first        = splitDate[2];
        let month        = splitDate[1];
        let year         = splitDate[0];
        let monthSplit   = month;
        let subMonth     = month.substring(0, 1);
        let subDay       = first.substring(0,1);
        if(subMonth.includes('0'))
        {
            monthSplit = month.split('0')[1];
        }
        if(subDay.includes('0'))
        {
            first  = first.split('0')[1];
        }
        return {first : first, last : last, month : monthSplit, year : year};
    }
}