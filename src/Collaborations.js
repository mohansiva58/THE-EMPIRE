        // brands images 
import b1 from './Brands/ax.jpg';
import b2 from './Brands/bigbunny.jpg';
import b3 from './Brands/hm.jpg';
import b4 from './Brands/rarerabbit.jpg';
import b5 from './Brands/snitch.jpg';
import b6 from './Brands/zara.jpg';
import './Collaborations.css';

const Collaborations = () => (
        <div>
            <div className='collab'>
          <h1>Collaborations</h1>
          <p>Collaborations with various brands will be displayed here.</p>
          </div>
          <div className="about-container">
           
            <div className="card">
              <img src={b1} alt="Brand 1"/>
              <div className="card-text">Armani Exchange is Armani’s mass-market brand for fashion-conscious consumers. It is widely accessible and priced more affordably. </div>
             
            </div>
            <div className="card">
              <img src={b2} alt="Brand 2"/>
              <div className="card-text"> Bunny review will give you the lowdown on their purchasing highlights, best-selling products, and customer feedback so you can make an informed choice about ordering..</div>
            </div>
            <div className="card">
              <img src={b3} alt="Brand 3"/>
              <div className="card-text">H&M is a retail chain clothing and apparel manufacturing fashion Swedish multinational company. Erling Persson founded the retail chain fashion brand in 1947.</div>
            </div>
            <div className="card">
              <img src={b4} alt="Brand 4"/>
              <div className="card-text"> Rare Rabbit was started in 2015 by Radhamani Textiles, a company run by Poddar's family. As the owner and creative director, Poddar scoured stores in Europe to glean ideas .</div>
            </div>
            <div className="card">
              <img src={b5} alt="Brand 5"/>
              <div className="card-text">Siddharth, the founder of Snitch, started this company to solve men’s fashion problems. In Season 2, Shark Tank India Episode 20, he was asked why he started this brand when there were other brands, such as H & M and Pantaloons. While pitching to the Shark Tank India 2 Judges, Siddharth explained that women have many options for choosing clothes.. </div>
            </div>
            <div className="card">
              <img src={b6} alt="Brand 6"/>
              <div className="card-text">ZARA is a Spanish fashion brand. ZARA, founded in 1974, originated in Spain and quickly became a global fashion giant.Its founder, Amancio Ortega, is one of the richest people in the world. Amancio Ortega, the mastermind behind ZARA.ZARA is known for its fast-fashion business model..The brand releases around 12,000 new designs each year.</div>
            </div>
          </div>
        </div>
      );
      export default Collaborations;