module.exports = {
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },
    
    preview_contents: contents => { 
        return contents.slice(0,50) + "..."
    },

    days_ago: date => {
        let d = new Date();
        let ago = date
        let diffdays = ago.getDate() - d.getDate()
        if (diffdays == 0) {
            return "today"
        } else if (diffdays == 1) { 
            return "yesterday"
        } else {
            return diffdays + "days ago";
            
        }
        
    }

}