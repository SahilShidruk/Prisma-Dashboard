import React from 'react';

function Home() {
  return (
    <div className="bg-base-200 py-14 pt-16">
      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="py-9 text-5xl font-bold">Prisma Bot</h1>
            <p className="py-2 px-6">
              A Multipurpose Discord Bot With Many Features Like Antinuke, Automod, Ticket and More. 
            </p>
            <a href="https://discord.com/oauth2/authorize?client_id=1259176971729109223&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify+email+guilds">
              <button className="btn btn-accent my-6">Login With Discord</button>
            </a>
          </div>
        </div>
      </div>
      <div className="md:ml-40 lg:ml-40 bg-base-200">
        <div className="card bg-base-200 shadow-2xl w-fit m-4">
          <figure>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14GjDvMki3i_MxCsOFAm8OEvb7GlDE5sA7w&usqp=CAU"
              alt="Antinuke" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-blue-400">Antinuke System</h2>
            <p>A powerful antinuke system with whitelist system.</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-2xl w-fit m-4">
          <figure>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14GjDvMki3i_MxCsOFAm8OEvb7GlDE5sA7w&usqp=CAU"
              alt="Automod" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-blue-400">Automod System</h2>
            <p>Automod System with anti-spam, anti-link and more.</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
        <div className="card bg-base-200 shadow-2xl w-fit m-4">
          <figure>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT14GjDvMki3i_MxCsOFAm8OEvb7GlDE5sA7w&usqp=CAU"
              alt="Many More" />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-blue-400">Many More</h2>
            <p>There are many features in bot use /help on discord or see docs here</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
