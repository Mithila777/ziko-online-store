import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.blog.deleteMany({}); // clear table first

  const blogs = [
    {
      title: 'The Future of AI in Everyday Life',
      excerpt: 'How AI is transforming the way we live and work.',
      content: `Artificial Intelligence is rapidly changing our daily routines. 
It helps with tasks from scheduling meetings to driving cars. 
Businesses are leveraging AI for better decision-making. 
Understanding AI's potential today will prepare us for tomorrow.`,
      image: '/image/blog/blog1.jpg',
    },
    {
      title: 'Top 10 Travel Destinations in 2025',
      excerpt: 'Explore the must-visit places around the world this year.',
      content: `Travel opens our minds to new cultures and experiences. 
From tropical beaches to snowy mountains, adventure awaits. 
Planning ahead ensures you get the most out of your trip. 
These destinations are trending and offer unforgettable experiences.`,
      image: '/image/blog/blog2.jpg',
    },
    {
      title: 'Healthy Eating Tips for a Busy Lifestyle',
      excerpt: 'Simple strategies to maintain nutrition on the go.',
      content: `Balancing work and health can be challenging. 
Meal prepping saves time and reduces unhealthy snacking. 
Incorporating fruits and vegetables is essential. 
Small changes daily lead to lasting health benefits.`,
      image: '/image/blog/blog3.jpg',
    },
    {
      title: 'The Rise of Remote Work',
      excerpt: 'Why remote work is becoming the new normal.',
      content: `Remote work offers flexibility and autonomy for employees. 
Companies are adapting to virtual collaboration tools. 
Maintaining work-life balance is crucial in home offices. 
This trend is reshaping modern business culture worldwide.`,
      image: '/image/blog/blog4.jpg',
    },
    {
      title: 'Beginner’s Guide to Investing',
      excerpt: 'Learn how to grow your money wisely.',
      content: `Investing early can make a big difference over time. 
Understanding stocks, bonds, and funds is key. 
Diversification helps reduce risks. 
Smart investing ensures financial stability and growth.`,
      image: '/image/blog/blog5.jpg',
    },
    {
      title: 'Sustainable Living Practices',
      excerpt: 'Small steps to reduce your environmental impact.',
      content: `Sustainability starts with conscious choices. 
Recycling and reducing waste make a tangible difference. 
Choosing eco-friendly products supports the planet. 
Every small effort contributes to a healthier future.`,
      image: '/image/blog/blog6.jpg',
    },
  ];

  await prisma.$transaction(
    blogs.map(blog => prisma.blog.create({ data: blog }))
  );

  console.log('6 blogs seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
