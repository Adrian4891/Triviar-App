const getAnswersApi = async (req, res) => {
    try {
      const response = [];
        const  dataRes = await fetch(`https://opentdb.com/api.php?amount=10`);
        const data = await dataRes.json();
        data.results.forEach((result, index)=>{
          const obj = {
            category:result.category ,
            type :result.type,
            question:result.question,
            correct_answer:result.correct_answer,
          }
          response.push(obj);
        if(obj.type === "multiple"){
          obj.options = [result.correct_answer];
          result.incorrect_answers.forEach(answ=> {
            obj.options.push(answ);
          }); 
        }
        if(response[index].options) response[index].options = arrOrderRandom(response[index].options);
      });
      return res.status(200).json(response);
    } catch (error) {
      return res.status(401).send(error.message);
    }
}



const arrOrderRandom = (array) => {
  for(let i = array.length-1; i > 0; i--){
    let tempValue = array[i];
    let indexRandom = Math.floor(Math.random()* (i + 1));
    array[i] = array[indexRandom];
    array[indexRandom] = tempValue;
  }
  return array;
}

module.exports = getAnswersApi;

