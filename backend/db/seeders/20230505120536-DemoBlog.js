module.exports = {
  async up(queryInterface) {
    const blogs = [];

    for (let i = 1; i <= 70; i += 1) {
      const description = `text${i}`;
      const userId = 1;

      blogs.push({
        description,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Blogs', blogs, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Blogs', null, {});
  },
};
