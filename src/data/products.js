// Each product's 3D form is described parametrically (no external model files
// needed) so ProductViewer3D can build it procedurally with primitives.
// `form` selects a builder in ProductViewer3D; `tone` tints the glass/shade.

export const products = [
  {
    id: 'ansa',
    name: 'Ansa Arc Lamp',
    price: 480,
    material: 'Spun brass, blown amber glass',
    dimensions: '38 × 22 × 52 cm',
    wattage: '12W LED, 2700K',
    form: 'arc',
    tone: '#C9A227',
    blurb: 'A single brass arm curves from a cast iron base to hold a hand-blown amber globe.',
  },
  {
    id: 'terra',
    name: 'Terra Table Light',
    price: 260,
    material: 'Glazed stoneware, oak',
    dimensions: '18 × 18 × 30 cm',
    wattage: '7W LED, 2200K',
    form: 'terra',
    tone: '#B5653B',
    blurb: 'A squat stoneware body glazed in oxidized copper, capped with a turned oak diffuser.',
  },
  {
    id: 'obelus',
    name: 'Obelus Floor Lamp',
    price: 720,
    material: 'Blackened steel, linen shade',
    dimensions: '30 × 30 × 148 cm',
    wattage: '15W LED, 2700K',
    form: 'obelisk',
    tone: '#7C8471',
    blurb: 'A tapered steel obelisk wrapped in raw linen, standing sentinel in any room.',
  },
  {
    id: 'orbis',
    name: 'Orbis Pendant',
    price: 340,
    material: 'Etched glass, brass rigging',
    dimensions: 'Ø 26 × 26 cm',
    wattage: '9W LED, 2400K',
    form: 'orb',
    tone: '#EDE8DF',
    blurb: 'A frosted sphere suspended in a brass ring, casting a soft even wash of light.',
  },
  {
    id: 'stele',
    name: 'Stele Wall Sconce',
    price: 190,
    material: 'Cast concrete, opal acrylic',
    dimensions: '14 × 8 × 34 cm',
    wattage: '5W LED, 2700K',
    form: 'stele',
    tone: '#B8B2A4',
    blurb: 'A slender concrete slab with a hidden vertical light channel, uplighting the wall.',
  },
  {
    id: 'fulcrum',
    name: 'Fulcrum Desk Lamp',
    price: 310,
    material: 'Milled aluminum, walnut base',
    dimensions: '16 × 24 × 44 cm',
    wattage: '8W LED, 3000K',
    form: 'fulcrum',
    tone: '#C9A227',
    blurb: 'A counterbalanced aluminum head pivots on a walnut fulcrum for precise task light.',
  },
]

export function getProduct(id) {
  return products.find((p) => p.id === id)
}
