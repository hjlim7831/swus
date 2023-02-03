import React from 'react'
import "./Modal.css";

function modal(props) {

  const { open, close, header } = props;

  return (
    <>
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>{props.children}</main>
            <footer>
              <button className="delete" onClick={close} style={{ margin: 2, backgroundColor: "red" }}>
                네
              </button>
              <button className="close" onClick={close} style={{ margin: 2, backgroundColor: "darkgray" }}>
                아니요
              </button>
            </footer>
          </section>
        ) : null}
      </div>
    </>
  )
}

export default modal