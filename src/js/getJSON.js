export const getJSON = async function (API_URL, specificProduct = '') {
    try{
        const res = await fetch(`${API_URL}${specificProduct}`)

        if(!res.ok) throw new Error('There is a problem in retreiving data from API')
        const data = await res.json()
        return data;
    }catch(err){
        throw err;
    }
}