import Link from 'next/link'
import Script from 'next/script'
import React from 'react'
import Layout from '@/components/Layout'
import { useAuth } from '@/context/auth'

const Index = () => {
  const { user } = useAuth()
  return (
    <>
      <div>
        <section id='header'>
          <div className='inner'>
            <span className='icon solid major fa-cloud'></span>
            <h1>
              ここはNext.JSを用いた<strong>テストサイト</strong>です.
              <br />
              検証が終わったら<a href='http://html5up.net'>もう一つのテストサイトへ</a>.
            </h1>
            <p>
              PWA、ツイッター投稿、インスタグラム投稿を兼ね備えたデモテーマです.　
              <br />
              ツイッターのタイムラインは、デザインが微妙なのとインスタグラムに力を入れているので、
              <br />
              使用していません.
            </p>
            <ul className='actions special'>
              <li>
                <a href='#post' className='button scrolly'>
                  デモを見る
                </a>
              </li>
            </ul>
          </div>
        </section>
        <section id='five' className='main style1 container major special'>
          <h2>インスタグラム</h2>
          <div className='box alt'>
            <div className='row gtr-uniform gtr-50'>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic02.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic03.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic04.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic03.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic04.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic02.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic04.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic02.jpg' alt='' />
                </span>
              </div>
              <div className='col-4'>
                <span className='image fit'>
                  <img src='/images/pic03.jpg' alt='' />
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* <section id='five' className='main style1'>
          <div className='container'>
            <header className='major special'>
              <h2>Elements</h2>
            </header>

            <section>
              <h4>Text</h4>
              <p>
                This is <b>bold</b> and this is <strong>strong</strong>. This is <i>italic</i> and
                this is <em>emphasized</em>. This is <sup>superscript</sup> text and this is{' '}
                <sub>subscript</sub> text. This is <u>underlined</u> and this is code: Finally,{' '}
                <a href='#'>this is a link</a>.
              </p>
              <hr />
              <header>
                <h4>Heading with a Subtitle</h4>
                <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
              </header>
              <p>
                Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem
                non mi integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed
                ante lacinia sapien lorem accumsan varius montes viverra nibh in adipiscing blandit
                tempus accumsan.
              </p>
              <header>
                <h5>Heading with a Subtitle</h5>
                <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
              </header>
              <p>
                Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem
                non mi integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed
                ante lacinia sapien lorem accumsan varius montes viverra nibh in adipiscing blandit
                tempus accumsan.
              </p>
              <hr />
              <h2>Heading Level 2</h2>
              <h3>Heading Level 3</h3>
              <h4>Heading Level 4</h4>
              <h5>Heading Level 5</h5>
              <h6>Heading Level 6</h6>
              <hr />
              <h5>Blockquote</h5>
              <blockquote>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget
                tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit
                adipiscing eu felis iaculis volutpat ac adipiscing accumsan faucibus. Vestibulum
                ante ipsum primis in faucibus lorem ipsum dolor sit amet nullam adipiscing eu felis.
              </blockquote>
            </section>

            <section>
              <h4>Lists</h4>
              <div className='row'>
                <div className='col-6 col-12-medium'>
                  <h5>Unordered</h5>
                  <ul>
                    <li>Dolor pulvinar etiam.</li>
                    <li>Sagittis adipiscing.</li>
                    <li>Felis enim feugiat.</li>
                  </ul>
                  <h5>Alternate</h5>
                  <ul className='alt'>
                    <li>Dolor pulvinar etiam.</li>
                    <li>Sagittis adipiscing.</li>
                    <li>Felis enim feugiat.</li>
                  </ul>
                </div>
                <div className='col-6 col-12-medium'>
                  <h5>Ordered</h5>
                  <ol>
                    <li>Dolor pulvinar etiam.</li>
                    <li>Etiam vel felis viverra.</li>
                    <li>Felis enim feugiat.</li>
                    <li>Dolor pulvinar etiam.</li>
                    <li>Etiam vel felis lorem.</li>
                    <li>Felis enim et feugiat.</li>
                  </ol>
                  <h5>Icons</h5>
                  <ul className='icons'>
                    <li>
                      <a href='#' className='icon brands fa-twitter'>
                        <span className='label'>Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a href='#' className='icon brands fa-facebook-f'>
                        <span className='label'>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href='#' className='icon brands fa-instagram'>
                        <span className='label'>Instagram</span>
                      </a>
                    </li>
                    <li>
                      <a href='#' className='icon brands fa-github'>
                        <span className='label'>Github</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <h5>Actions</h5>
              <div className='row'>
                <div className='col-6 col-12-medium'>
                  <ul className='actions'>
                    <li>
                      <a href='#' className='button primary'>
                        Default
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button'>
                        Default
                      </a>
                    </li>
                  </ul>
                  <ul className='actions small'>
                    <li>
                      <a href='#' className='button primary small'>
                        Small
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button small'>
                        Small
                      </a>
                    </li>
                  </ul>
                  <ul className='actions stacked'>
                    <li>
                      <a href='#' className='button primary'>
                        Default
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button'>
                        Default
                      </a>
                    </li>
                  </ul>
                  <ul className='actions stacked'>
                    <li>
                      <a href='#' className='button primary small'>
                        Small
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button small'>
                        Small
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='col-6 col-12-medium'>
                  <ul className='actions stacked'>
                    <li>
                      <a href='#' className='button primary fit'>
                        Default
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button fit'>
                        Default
                      </a>
                    </li>
                  </ul>
                  <ul className='actions stacked'>
                    <li>
                      <a href='#' className='button primary small fit'>
                        Small
                      </a>
                    </li>
                    <li>
                      <a href='#' className='button small fit'>
                        Small
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h4>Buttons</h4>
              <ul className='actions'>
                <li>
                  <a href='#' className='button primary'>
                    Primary
                  </a>
                </li>
                <li>
                  <a href='#' className='button'>
                    Default
                  </a>
                </li>
              </ul>
              <ul className='actions'>
                <li>
                  <a href='#' className='button large'>
                    Large
                  </a>
                </li>
                <li>
                  <a href='#' className='button'>
                    Default
                  </a>
                </li>
                <li>
                  <a href='#' className='button small'>
                    Small
                  </a>
                </li>
              </ul>
              <ul className='actions fit'>
                <li>
                  <a href='#' className='button fit'>
                    Fit
                  </a>
                </li>
                <li>
                  <a href='#' className='button primary fit'>
                    Fit
                  </a>
                </li>
                <li>
                  <a href='#' className='button fit'>
                    Fit
                  </a>
                </li>
              </ul>
              <ul className='actions fit small'>
                <li>
                  <a href='#' className='button primary fit small'>
                    Fit + Small
                  </a>
                </li>
                <li>
                  <a href='#' className='button fit small'>
                    Fit + Small
                  </a>
                </li>
                <li>
                  <a href='#' className='button primary fit small'>
                    Fit + Small
                  </a>
                </li>
              </ul>
              <ul className='actions'>
                <li>
                  <a href='#' className='button primary icon solid fa-download'>
                    Icon
                  </a>
                </li>
                <li>
                  <a href='#' className='button icon solid fa-download'>
                    Icon
                  </a>
                </li>
              </ul>
              <ul className='actions'>
                <li>
                  <span className='button primary disabled'>Disabled</span>
                </li>
                <li>
                  <span className='button disabled'>Disabled</span>
                </li>
              </ul>
            </section>

            <section>
              <h4>Form</h4>
              <form method='post' action='#'>
                <div className='row gtr-uniform gtr-50'>
                  <div className='col-6 col-12-xsmall'>
                    <input
                      type='text'
                      name='demo-name'
                      id='demo-name'
                      value=''
                      placeholder='Name'
                    />
                  </div>
                  <div className='col-6 col-12-xsmall'>
                    <input
                      type='email'
                      name='demo-email'
                      id='demo-email'
                      value=''
                      placeholder='Email'
                    />
                  </div>
                  <div className='col-12'>
                    <select name='demo-category' id='demo-category'>
                      <option value=''>- Category -</option>
                      <option value='1'>Manufacturing</option>
                      <option value='1'>Shipping</option>
                      <option value='1'>Administration</option>
                      <option value='1'>Human Resources</option>
                    </select>
                  </div>
                  <div className='col-4 col-12-small'>
                    <input type='radio' id='demo-priority-low' name='demo-priority' checked />
                    <label htmlFor='demo-priority-low'>Low</label>
                  </div>
                  <div className='col-4 col-12-small'>
                    <input type='radio' id='demo-priority-normal' name='demo-priority' />
                    <label htmlFor='demo-priority-normal'>Normal</label>
                  </div>
                  <div className='col-4 col-12-small'>
                    <input type='radio' id='demo-priority-high' name='demo-priority' />
                    <label htmlFor='demo-priority-high'>High</label>
                  </div>
                  <div className='col-6 col-12-small'>
                    <input type='checkbox' id='demo-copy' name='demo-copy' />
                    <label htmlFor='demo-copy'>Email me a copy</label>
                  </div>
                  <div className='col-6 col-12-small'>
                    <input type='checkbox' id='demo-human' name='demo-human' checked />
                    <label htmlFor='demo-human'>Not a robot</label>
                  </div>
                  <div className='col-12'>
                    <textarea
                      name='demo-message'
                      id='demo-message'
                      placeholder='Enter your message'
                      rows='6'
                    ></textarea>
                  </div>
                  <div className='col-12'>
                    <ul className='actions'>
                      <li>
                        <input type='submit' value='Send Message' className='primary' />
                      </li>
                      <li>
                        <input type='reset' value='Reset' />
                      </li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>

            <section>
              <h4>Image</h4>
              <h5>Fit</h5>
              <div className='box alt'>
                <div className='row gtr-uniform gtr-50'>
                  <div className='col-12'>
                    <span className='image fit'>
                      <img src='images/pic06.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic02.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic03.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic04.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic03.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic04.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic02.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic04.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic02.jpg' alt='' />
                    </span>
                  </div>
                  <div className='col-4'>
                    <span className='image fit'>
                      <img src='images/pic03.jpg' alt='' />
                    </span>
                  </div>
                </div>
              </div>
              <h5>Left &amp; Right</h5>
              <p>
                <span className='image left'>
                  <img src='images/pic05.jpg' alt='' />
                </span>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget.
                tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit
                adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
                ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Donec accumsan
                interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
                ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis
                sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus.
                Integer ac pellentesque praesent. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis
                sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus.
                Integer ac pellentesque praesent.
              </p>
              <p>
                <span className='image right'>
                  <img src='images/pic05.jpg' alt='' />
                </span>
                Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget.
                tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit
                adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac
                pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
                ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Donec accumsan
                interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante
                ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis
                sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus.
                Integer ac pellentesque praesent. Blandit adipiscing eu felis iaculis volutpat ac
                adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis
                sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum.
                Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus.
                Integer ac pellentesque praesent.
              </p>
            </section>
          </div>
        </section> */}

        <section id='four' className='main style2 special'>
          <div className='container'>
            <header className='major'>
              <h2>あなたは管理者ですか？</h2>
            </header>
            <p>管理者の投稿はこちら.</p>
            <ul className='actions special'>
              <li>
                <a href='#' className='button wide primary'>
                  Sign Up
                </a>
              </li>
              {/* <li>
                <a href='#' className='button wide'>
                  Learn More
                </a>
              </li> */}
            </ul>
          </div>
        </section>

        {/* <section id="five" className="main style1">
      <div className="container">
        <header className="major special">
          <h2>Elements</h2>
        </header>

        <section>
          <h4>Text</h4>
          <p>This is <b>bold</b> and this is <strong>strong</strong>. This is <i>italic</i> and this is <em>emphasized</em>.
          This is <sup>superscript</sup> text and this is <sub>subscript</sub> text.
          This is <u>underlined</u> and this is code: <code>for (;;) { ... }</code>. Finally, <a href="#">this is a link</a>.</p>
          <hr />
          <header>
            <h4>Heading with a Subtitle</h4>
            <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
          </header>
          <p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem accumsan varius montes viverra nibh in adipiscing blandit tempus accumsan.</p>
          <header>
            <h5>Heading with a Subtitle</h5>
            <p>Lorem ipsum dolor sit amet nullam id egestas urna aliquam</p>
          </header>
          <p>Nunc lacinia ante nunc ac lobortis. Interdum adipiscing gravida odio porttitor sem non mi integer non faucibus ornare mi ut ante amet placerat aliquet. Volutpat eu sed ante lacinia sapien lorem accumsan varius montes viverra nibh in adipiscing blandit tempus accumsan.</p>
          <hr />
          <h2>Heading Level 2</h2>
          <h3>Heading Level 3</h3>
          <h4>Heading Level 4</h4>
          <h5>Heading Level 5</h5>
          <h6>Heading Level 6</h6>
          <hr />
          <h5>Blockquote</h5>
          <blockquote>Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan faucibus. Vestibulum ante ipsum primis in faucibus lorem ipsum dolor sit amet nullam adipiscing eu felis.</blockquote>
          <h5>Preformatted</h5>
          <pre><code>i = 0;

while (!deck.isInOrder()) {
print 'Iteration ' + i;
deck.shuffle();
i++;
}

print 'It took ' + i + ' iterations to sort the deck.';</code></pre>
        </section>

        <section>
          <h4>Lists</h4>
          <div className="row">
            <div className="col-6 col-12-medium">
              <h5>Unordered</h5>
              <ul>
                <li>Dolor pulvinar etiam.</li>
                <li>Sagittis adipiscing.</li>
                <li>Felis enim feugiat.</li>
              </ul>
              <h5>Alternate</h5>
              <ul className="alt">
                <li>Dolor pulvinar etiam.</li>
                <li>Sagittis adipiscing.</li>
                <li>Felis enim feugiat.</li>
              </ul>
            </div>
            <div className="col-6 col-12-medium">
              <h5>Ordered</h5>
              <ol>
                <li>Dolor pulvinar etiam.</li>
                <li>Etiam vel felis viverra.</li>
                <li>Felis enim feugiat.</li>
                <li>Dolor pulvinar etiam.</li>
                <li>Etiam vel felis lorem.</li>
                <li>Felis enim et feugiat.</li>
              </ol>
              <h5>Icons</h5>
              <ul className="icons">
                <li><a href="#" className="icon brands fa-twitter"><span className="label">Twitter</span></a></li>
                <li><a href="#" className="icon brands fa-facebook-f"><span className="label">Facebook</span></a></li>
                <li><a href="#" className="icon brands fa-instagram"><span className="label">Instagram</span></a></li>
                <li><a href="#" className="icon brands fa-github"><span className="label">Github</span></a></li>
              </ul>
            </div>
          </div>
          <h5>Actions</h5>
          <div className="row">
            <div className="col-6 col-12-medium">
              <ul className="actions">
                <li><a href="#" className="button primary">Default</a></li>
                <li><a href="#" className="button">Default</a></li>
              </ul>
              <ul className="actions small">
                <li><a href="#" className="button primary small">Small</a></li>
                <li><a href="#" className="button small">Small</a></li>
              </ul>
              <ul className="actions stacked">
                <li><a href="#" className="button primary">Default</a></li>
                <li><a href="#" className="button">Default</a></li>
              </ul>
              <ul className="actions stacked">
                <li><a href="#" className="button primary small">Small</a></li>
                <li><a href="#" className="button small">Small</a></li>
              </ul>
            </div>
            <div className="col-6 col-12-medium">
              <ul className="actions stacked">
                <li><a href="#" className="button primary fit">Default</a></li>
                <li><a href="#" className="button fit">Default</a></li>
              </ul>
              <ul className="actions stacked">
                <li><a href="#" className="button primary small fit">Small</a></li>
                <li><a href="#" className="button small fit">Small</a></li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h4>Table</h4>
          <h5>Default</h5>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item One</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item Two</td>
                  <td>Vis ac commodo adipiscing arcu aliquet.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item Three</td>
                  <td> Morbi faucibus arcu accumsan lorem.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item Four</td>
                  <td>Vitae integer tempus condimentum.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item Five</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2"></td>
                  <td>100.00</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h5>Alternate</h5>
          <div className="table-wrapper">
            <table className="alt">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item One</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item Two</td>
                  <td>Vis ac commodo adipiscing arcu aliquet.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item Three</td>
                  <td> Morbi faucibus arcu accumsan lorem.</td>
                  <td>29.99</td>
                </tr>
                <tr>
                  <td>Item Four</td>
                  <td>Vitae integer tempus condimentum.</td>
                  <td>19.99</td>
                </tr>
                <tr>
                  <td>Item Five</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2"></td>
                  <td>100.00</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section>
          <h4>Buttons</h4>
          <ul className="actions">
            <li><a href="#" className="button primary">Primary</a></li>
            <li><a href="#" className="button">Default</a></li>
          </ul>
          <ul className="actions">
            <li><a href="#" className="button large">Large</a></li>
            <li><a href="#" className="button">Default</a></li>
            <li><a href="#" className="button small">Small</a></li>
          </ul>
          <ul className="actions fit">
            <li><a href="#" className="button fit">Fit</a></li>
            <li><a href="#" className="button primary fit">Fit</a></li>
            <li><a href="#" className="button fit">Fit</a></li>
          </ul>
          <ul className="actions fit small">
            <li><a href="#" className="button primary fit small">Fit + Small</a></li>
            <li><a href="#" className="button fit small">Fit + Small</a></li>
            <li><a href="#" className="button primary fit small">Fit + Small</a></li>
          </ul>
          <ul className="actions">
            <li><a href="#" className="button primary icon solid fa-download">Icon</a></li>
            <li><a href="#" className="button icon solid fa-download">Icon</a></li>
          </ul>
          <ul className="actions">
            <li><span className="button primary disabled">Disabled</span></li>
            <li><span className="button disabled">Disabled</span></li>
          </ul>
        </section>

        <section>
          <h4>Form</h4>
          <form method="post" action="#">
            <div className="row gtr-uniform gtr-50">
              <div className="col-6 col-12-xsmall">
                <input type="text" name="demo-name" id="demo-name" value="" placeholder="Name" />
              </div>
              <div className="col-6 col-12-xsmall">
                <input type="email" name="demo-email" id="demo-email" value="" placeholder="Email" />
              </div>
              <div className="col-12">
                <select name="demo-category" id="demo-category">
                  <option value="">- Category -</option>
                  <option value="1">Manufacturing</option>
                  <option value="1">Shipping</option>
                  <option value="1">Administration</option>
                  <option value="1">Human Resources</option>
                </select>
              </div>
              <div className="col-4 col-12-small">
                <input type="radio" id="demo-priority-low" name="demo-priority" checked>
                <label htmlFor="demo-priority-low">Low</label>
              </div>
              <div className="col-4 col-12-small">
                <input type="radio" id="demo-priority-normal" name="demo-priority">
                <label htmlFor="demo-priority-normal">Normal</label>
              </div>
              <div className="col-4 col-12-small">
                <input type="radio" id="demo-priority-high" name="demo-priority">
                <label htmlFor="demo-priority-high">High</label>
              </div>
              <div className="col-6 col-12-small">
                <input type="checkbox" id="demo-copy" name="demo-copy">
                <label htmlFor="demo-copy">Email me a copy</label>
              </div>
              <div className="col-6 col-12-small">
                <input type="checkbox" id="demo-human" name="demo-human" checked>
                <label htmlFor="demo-human">Not a robot</label>
              </div>
              <div className="col-12">
                <textarea name="demo-message" id="demo-message" placeholder="Enter your message" rows="6"></textarea>
              </div>
              <div className="col-12">
                <ul className="actions">
                  <li><input type="submit" value="Send Message" className="primary" /></li>
                  <li><input type="reset" value="Reset" /></li>
                </ul>
              </div>
            </div>
          </form>
        </section>

        <section>
          <h4>Image</h4>
          <h5>Fit</h5>
          <div className="box alt">
            <div className="row gtr-uniform gtr-50">
              <div className="col-12"><span className="image fit"><img src="images/pic06.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic04.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic04.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic04.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic02.jpg" alt="" /></span></div>
              <div className="col-4"><span className="image fit"><img src="images/pic03.jpg" alt="" /></span></div>
            </div>
          </div>
          <h5>Left &amp; Right</h5>
          <p><span className="image left"><img src="images/pic05.jpg" alt="" /></span>Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent.</p>
          <p><span className="image right"><img src="images/pic05.jpg" alt="" /></span>Fringilla nisl. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Donec accumsan interdum nisi, quis tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent tincidunt felis sagittis eget. tempus euismod. Vestibulum ante ipsum primis in faucibus vestibulum. Blandit adipiscing eu felis iaculis volutpat ac adipiscing accumsan eu faucibus. Integer ac pellentesque praesent.</p>
        </section>

      </div>
    </section> */}

        <section id='footer'>
          <ul className='icons'>
            <li>
              <a href='#' className='icon brands alt fa-twitter'>
                <span className='label'>Twitter</span>
              </a>
            </li>
            <li>
              <a href='#' className='icon brands alt fa-facebook-f'>
                <span className='label'>Facebook</span>
              </a>
            </li>
            <li>
              <a href='#' className='icon brands alt fa-instagram'>
                <span className='label'>Instagram</span>
              </a>
            </li>
            <li>
              <a href='#' className='icon brands alt fa-github'>
                <span className='label'>GitHub</span>
              </a>
            </li>
            <li>
              <a href='#' className='icon solid alt fa-envelope'>
                <span className='label'>Email</span>
              </a>
            </li>
          </ul>
          <ul className='copyright'>
            <li>&copy; Untitled</li>
            <li>
              Design: <a href='http://html5up.net'>HTML5 UP</a>
            </li>
          </ul>
        </section>
      </div>
    </>
  )
}

export default Index

// <Layout>
//   <div className='flex justify-center items-center h-full'>
//     {user ? (
//       <></>
//     ) : (
//       <>
//         <div className='text-center py-10 px-4 sm:px-6 lg:px-8'>
//           <h1 className='block text-6xl font-bold text-gray-800 max-sm:text-3xl'>
//             ようこそ！
//             <br />
//             Welcome!
//           </h1>
//           <p className='mt-6 text-gray-600 dark:text-gray-600 font-bold'>
//             ログインしてページをご確認ください。
//           </p>
//           <p className='text-gray-600 dark:text-gray-500'>Please log in and check the page.</p>
//           <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3'>
//             <Link
//               className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
//               href='/auth/login'
//             >
//               ログインする
//             </Link>
//           </div>
//         </div>
//       </>
//     )}
//   </div>
// </Layout>
