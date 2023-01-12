module.exports = {

    //function to format the date into mm/dd/yyyy format.
    format_date: date => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear() + " @ " + time}`;
        return date
    },
    // shortens the text to 50 characters for better display on home page. If the text is already lees than 50 it will not perform this function
    preview_contents: contents => { 
        if (contents == null) {
            return contents
        }else if (contents.length >= 51) {
            return contents.slice(0, 50) + "..."
        } else { 
            return contents
        }
    },
// function to find how many days ago a date was 
    days_ago: date => {
        let d = new Date();
        let ago = date
        let diffdays = d.getDate() - ago.getDate()
        if (diffdays == 0) {
            return "Today"
        } else if (diffdays == 1) { 
            return "Yesterday"
        } else {
            return diffdays + "Days ago";
            
        }
        
    }

}