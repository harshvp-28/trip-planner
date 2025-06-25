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
        id: 4,
        title: 'Friends',
        desc: 'Laughter, memories, and friendship',
        icon: '😎',
        people: '5 to 10 people'
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

export const AI_PROMPT = `Generate a travel plan in strict JSON format for location: {location}, for {totalDays} days for {traveler} with a {budget} budget.

Return:
1. best_time_to_visit
2. noOfDays: number of days for the trip (same as {totalDays})
3. hotel_options: array of at least 8 to 10 hotels. Each hotel must include:
   - name
   - address
   - price (in the local currency of the destination — include both the currency symbol and name, e.g., ₹2000 (INR - Indian Rupee), $150 (USD - US Dollar))
   - image_url
   - geo_coordinates
   - rating
   - description (a few sentences highlighting features, ambiance, and location)

4. itinerary: an object with keys like day1, day2, etc., where each day contains a "plan": an array of 5 to 7 diverse places or activities that cover the full day (morning, afternoon, evening, night). Each plan item must include:
   - place (name of the attraction or activity)
   - details (2–3 sentences describing what the place is, why it’s worth visiting, and what travelers can expect)
   - image_url
   - geo_coordinates
   - ticket_pricing (in local currency — include both symbol and name, e.g., €12 (EUR - Euro), ¥1000 (JPY - Japanese Yen))
   - rating
   - time (e.g., Morning / Afternoon / Evening / Night)

Guidelines:
- The itinerary must cover the entire day with a variety of experiences — historical, cultural, natural, recreational, or local food/shopping.
- Do not repeat the same attractions across different days.
- All prices (hotel and ticket_pricing) must be in the **local currency of the destination**, showing both the currency symbol and the currency name/code.
- The output must strictly follow the above JSON structure.`;




