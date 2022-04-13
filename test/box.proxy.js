const { expect } = require('chai')

let Box, box

describe('Box (proxy)', function () {

  beforeEach(async function () {
    Box = await ethers.getContractFactory("Box")
    box = await upgrades.deployProxy(Box, [42], { initializer: 'store' })
  })

  it('should returns the value previously initialized', async function () {
    expect((await box.retrieve()).toString()).to.equal('42')
    expect(() => { box.increment() }).to.throw(TypeError)
  })
})