
export default function Health({name,health}){

    return (
  <section className="container">
      <h2>{name}</h2>
      <div className="healthbar">
        <div className="healthbar__value" style={{width : health + "%"}}></div>
      </div>
    </section>
    );
}