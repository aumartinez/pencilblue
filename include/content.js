global.getContentSettings = function(output)
{
    defaultContentSettings =
    {
        articles_per_page: 5,
        auto_break_articles: 0,
        display_timestamp: 1,
        date_format: 'M dd, YYYY',
        display_hours_minutes: 1,
        time_format: '12',
        display_bylines: 1,
        display_author_photo: 1,
        display_author_position: 1,
        allow_comments: 1,
        default_comments: 1,
        require_verification: 0
    }
    
    getDBObjectsWithValues({object_type: 'setting', key: 'content_settings'}, function(data)
    {
        if(data.length == 0)
        {
            output(defaultContentSettings);
        }
        else
        {
            output(data[0].value);
        }
    
    });
}

global.getTimestampText = function(date, format, displayTime, timeFormat)
{
    var dateString = format;
    var monthNames = ['^loc_JAN^', '^loc_FEB^', '^loc_MAR^', '^loc_APR^', '^loc_MAY^', '^loc_JUN^', '^loc_JUL^', '^loc_AUG^', '^loc_SEP^', '^loc_OCT^', '^loc_NOV^', '^loc_DEC^'];
    
    dateString = dateString.split('YYYY').join(date.getFullYear());
    dateString = dateString.split('yy').join(date.getYear());
    dateString = dateString.split('M').join(monthNames[date.getMonth()]);
    dateString = dateString.split('mm').join(date.getMonth() + 1);
    dateString = dateString.split('dd').join(date.getDate());
    
    if(typeof displayTime !== 'undefined')
    {
        if(displayTime)
        {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = '';
            
            if(timeFormat == '12')
            {
                if(hours > 12)
                {
                    hours -= 12;
                    ampm = ' ^loc_TIME_PM^';
                }
                else
                {
                    ampm = ' ^loc_TIME_AM^';
                }
            }
            else
            {
                if(hours < 10)
                {
                    hours = '0' + hours;
                }
            }
            
            
            dateString = dateString.concat(' ' + hours + ':' + minutes + ampm);
        }
    }
    
    return dateString;
}

//TODO: move this into a util object
global.clone = function(object)
{
    return JSON.parse(JSON.stringify(object));
}
