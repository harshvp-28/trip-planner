export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travelers in tandem',
        icon:'🚀',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🤩',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A group of fun adv',
        icon:'🤩',
        people:'5 to 10 people'
    },
    
]
 export const SelectBudgetOptions=[
    {
        id:1,
        title: 'Cheap',
        desc:'Stay Consicious of Costs',
        icon:'🪙'
    },
    {
        id:2,
        title: 'Average',
        desc:'Keep cost on average side',
        icon:'💰'
    },
    {
        id:3,
        title: 'Luxury',
        desc:'Dont worry about costs',
        icon:'💸'
    }
    
 ]

 export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} People with a {budget} budget ,Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format  '