const db = require('../server/db')
const { Event } = require('../server/db/models')

const seed = async () => {
  await db.sync({
    force: true,
  })

  console.log('Sync the database successfully!')

  const eventOne = await Event.create({
    title: 'First Event',
    startTime: '10:30',
    endTime: '11:00',
    description: 'A great event',
    date: '2018-06-26'
  })

  const eventTwo = await Event.create({
    title: 'Second Event',
    startTime: '13:00',
    endTime: '13:45',
    description: 'Even better event',
    date: '2018-06-26'
  })
  const eventThree = await Event.create({
    title: 'Third Event',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Pretty nice thing',
    date: '2018-06-27'
  })

  const eventFour = await Event.create({
    title: 'Fourth Event',
    startTime: '12:00',
    endTime: '13:00',
    description: 'The best event',
    date: '2018-06-29'
  })

  console.log('Seed the database successfully!')
}

if (module === require.main) {
  seed().catch(err => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => {
    db.close();

    console.log('Close the database connection!');
  });

  console.log('Seeding...')
}
