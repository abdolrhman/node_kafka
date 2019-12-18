const kafka = require("./modules/kafka");

const consumer = kafka.consumer({ groupId: 'test-group' });
const topic = 'topic-test';

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });
  await consumer.run({
    eachBatch: async ({ batch }) => {
      console.log(batch)
    },
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
  })
};

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));

run().catch(console.error);
