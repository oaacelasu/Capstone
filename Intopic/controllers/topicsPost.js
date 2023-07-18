const Topics = require("./../models/Topics.js")

module.exports = async (req, res) => {
    
    // let obj = {};
    // obj.userId = "64a4b18f318f75eb6a5512ef";
    // obj.title = "Topic 3";
    // obj.imageURL = "imageURL 3";
    // obj.description = "Topic 3 - description";
    // obj.noOfQuizzesAvailable = 3;
    // Topics.create(obj);

    const allTopics = await Topics.find({})
    console.log("Printing from topicsPost.js page. obj -> ", allTopics);
    res.status(200).send({
        "message": "Retrieved", 
        allTopics: allTopics
    });
}