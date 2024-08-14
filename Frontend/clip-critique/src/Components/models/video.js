export class Video {
    

    constructor(id,imageurl,url,uploader,videoname,rating,date,count,percentage,category,agerating,artist) { 
        this.id=id;
        this.imageurl=imageurl;
        this.uploader=uploader;
        this.rating=rating;
        this.videoname=videoname;
        this.count=count;
        this.percentage =percentage;
        this.date=date;
        this.category=category;
        this.agerating=agerating;
        this.artist=artist;
        this.url=url;
     }    
    
    }

    export class videomin{

        constructor(id, imageurl, url, uploader, videoname, date, category, agerating,artist)  {

            this.id=id;
            this.imageurl=imageurl;
            this.uploader=uploader;
            this.videoname=videoname;
            this.date=date;
            this.category=category;
            this.agerating=agerating;
            this.artist=artist;
            this.url=url;
            console.log(artist)

         } 
         
    }