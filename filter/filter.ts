import { Dates } from '../dates/dates';

export class Filter
{
   private dateResult;
   private userArrOfObj : any;
   private date         : Dates;
   private finalResult  : any;

    /**
     * add your object
     */
    constructor(arrOfObj)
    {
        this.userArrOfObj = arrOfObj;
        this.date         = new Dates();
    }

    /**
     * filter by attribute and value
     */
    filterBy(attribute,value)
    {
        this.finalResult = this.userArrOfObj.filter(filterByAtt => filterByAtt[attribute] == value);
        return this;
    }

    /**
     * compound filters more info in readme
     */
    where(attribute,operator,value)
    {
        if(typeof this.finalResult === "undefined")
        {
            this.compoundFilter(attribute,operator,value,this.userArrOfObj)
        }
        else
        {
            this.compoundFilter(attribute,operator,value,this.finalResult);
        }
        return this;
    }
    
    /**
     * returns the filtered list
     */
    result()
    {
        return this.finalResult;
    }

private compoundFilter(attribute,operator,value,obj)
        {
            if(operator == "==")
            {
                this.finalResult = obj.filter(filterByAtt => filterByAtt[attribute] == value);
            }
            else if(operator == "!=")
            {
                this.finalResult = obj.filter(filterByAtt => filterByAtt[attribute] != value);
            }
            else if(operator == "<=")
            {
                this.finalResult = obj.filter(filterByAtt => filterByAtt[attribute] <= value);
            }
            else if(operator == ">=")
            {
                this.finalResult = obj.filter(filterByAtt => filterByAtt[attribute] >= value);
            }
            else
            {
                throw new Error("Invalid operator used, please use the following operators: ==, >=, <=, !=");
            }
        }

    /**
     * set date format
     */
    setDateFormat(format)
    {
        this.date.setFormat(format);
    }

     /**
     *  get date format
     */
    getDateFormat()
    {
        return this.date.getFormat();
    }

    filterByToday(attribute)
    {
        this.dateResult = this.date.today();
        this.filterDates(attribute, this.dateResult.date);
        return this;
    }

    filterByYesterday(attribute)
    {
        this.dateResult = this.date.yesterday();
        this.filterDates(attribute, this.dateResult.date);
        return this;
    }

    filterByCurrentWeek(attribute)
    {
        this.dateResult = this.date.currentWeek();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByCurrentMonth(attribute)
    {
        this.dateResult = this.date.currentMonth();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByNextWeek(attribute)
    {
        this.dateResult = this.date.nextWeek();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByNextMonth(attribute)
    {
        this.dateResult = this.date.nextWeek();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastWeek(attribute)
    {
        this.dateResult = this.date.lastWeek();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByNextThirtyDays(attribute)
    {
        this.dateResult = this.date.nextThirtyDays();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastSevenDays(attribute)
    {
        this.dateResult = this.date.lastSevenDays();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastThirtyDays(attribute)
    {
        this.dateResult = this.date.lastThirtyDays();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastSixtyDays(attribute)
    {
        this.dateResult = this.date.lastSixtyDays();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastNinetyDays(attribute)
    {
        this.dateResult = this.date.lastNinetyDays();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByMonthToDate(attribute)
    {
        this.dateResult = this.date.monthToDate();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

    filterByLastMonth(attribute)
    {
        this.dateResult = this.date.lastMonth();
        this.filterDates(attribute, this.dateResult);
        return this;
    }

private dateFilter(att, date)
        {
            if(typeof this.finalResult === "undefined")
            {
                this.finalResult = this.userArrOfObj.filter(filterByDate => new Date(filterByDate[att]).toDateString() == new Date(date).toDateString());
            }
            else
            {
                this.finalResult = this.finalResult.filter(filterByDate => new Date(filterByDate[att]).toDateString() == new Date(date).toDateString());
            }
        }


private filterDates(att, date)
        {

            if(typeof date.last != "undefined")
            {
                if(typeof this.finalResult === "undefined")
                {
                    this.finalResult = this.userArrOfObj.filter(filterByDate => new Date(filterByDate[att]) >= new Date(date.first) && new Date(filterByDate[att]) <= new Date(date.last));
                }
                else
                {
                    this.finalResult = this.finalResult.filter(filterByDate => new Date(filterByDate[att]) >= new Date(date.first) && new Date(filterByDate[att]) <= new Date(date.last));
                }
            }
            else
            {
                this.dateFilter(att, date);
            }
        }

    /**
     * returns user array of object
     */
    toString()
    {
        return this.userArrOfObj;
    }
}