const db = require("../data/db.config");

function findstories() {
  return db("user_stories");
}

function findByStoryId(id) {
  return db("user_stories").where("id", id).first();
}

function findByUserId(userId) {
  return db("user_stories as s")
    .leftJoin("users as u", "u.id", "s.user_id")
    .where("user_id", userId)
    .select("s.id", "s.story_title", "s.story_body", "s.user_id");
}

async function addStory(data) {
  const [id] = await db("user_stories").insert(data);
  return findByStoryId(id);
}

function removeStory(id) {
  return db("user_stories").where({ id }).del();
}

async function updateStory(id, storyData) {
  return db("user_stories").where("id", id).update(storyData);
}

module.exports = {
  findstories,
  findByStoryId,
  findByUserId,
  addStory,
  removeStory,
  updateStory,
};