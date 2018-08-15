import { Container } from 'reactstrap'

import Footer from '../common/Footer'

const Root = styled.div`
  margin-top: 64px;
  .content {
    min-height: 584px;
  }
`

const AboutUs = p => (
  <Root>
    <Container className='content'>
      <h1>Events come together here</h1>
      <p>
        VenueBook is revolutionizing the way people think about event booking.
        Our platform lets venues and bookers plan together,
        creating a smarter and better-connected experience for all.
        We simplify planning, so you can have more fun!
      </p>

      <h1>We value time-freedom</h1>
      <p>
        Measure twice, cut once, right?
        We’re focused on simplifying the event booking process and
        bringing the marketplace up to speed.
        We’ve spent countless hours perfecting true real-time availability,
        so you can see up-to-the-minute accurate details on venues you’re searching.
        We pride ourselves on open communication at our office or out in the world,
        and that carries over on our site and our SaaS platform. Speaking of our platform...
        we think it’s the bee’s knees.
        Venues using our software can experience around a 70% reduction in turnaround,
        processing and transaction times. That’s a lot more time for stuff that matters,
        and that’s what matters to us.
      </p>

      <h1>A community like family</h1>
      <p>
        VenueBook main headquarters is perfectly placed between the Village and SoHo,
        near Washington Square Park.
        From dosas, to the Comedy Cellar, to the wide spectrum of visitors and locals in the neighborhood,
        we love the energy and vibrant community that comes with an office in the heart of NYC.
        Regular happy hours and team outings keep us all connected to one another.
        We love to share our stories on social media and socialize in person.
        Through panel discussions, events, interviews and our email list,
        we’re learning that a great relationship with our community is a two-way street. We’re listening,
        and through conversation, we hope to evolve the way people think about booking events, together.
        Cheers to that!
      </p>
    </Container>
    <Footer />
  </Root>
)

export default AboutUs
