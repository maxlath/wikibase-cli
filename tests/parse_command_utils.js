import { parseGuid } from '#lib/parse_command_utils'
import 'should'

describe('parseGuid', () => {
  it('should support a valid item guid', async () => {
    const guid = 'Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal(guid)
  })

  it('should support shell-friendly hyphenated item guid', async () => {
    const guid = 'Q235116-6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal('Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support prefixed hyphenated item guid', async () => {
    const guid = 'wds:Q235116-6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal('Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support an over-escaped item guid', async () => {
    const guid = 'Q235116\\$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal('Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support a double quoted item guid', async () => {
    const guid = '"Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5"'
    parseGuid(guid).should.equal('Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support a simple quoted item guid', async () => {
    const guid = "'Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'"
    parseGuid(guid).should.equal('Q235116$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support a valid lexem form guid', async () => {
    const guid = 'L235116-F1$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal(guid)
  })

  it('should support shell-friendly hyphenated lexem form guid', async () => {
    const guid = 'L235116-F1-6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal('L235116-F1$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })

  it('should support prefixed hyphenated lexem form guid', async () => {
    const guid = 'wds:L235116-F1-6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5'
    parseGuid(guid).should.equal('L235116-F1$6E538A76-DDE7-4ED4-AE4F-6BCCFD6B74A5')
  })
})
