import binascii

letters = ('abcdefghijklmnopqrstuvwxyz'+
		   'ABCDEFGHIJKLMNOPQRSTUVWXYZ'+
		   '=+-_^%$<>*')

def load(savestring):
	datastring = binascii.unhexlify(savestring)
	aa = [x.split('_') for x in datastring.split('|')]
	ab = []
	for x,b in aa:
		if b == "True" or b == "False":
			ab.append((x,bool(b)))
		else:
			ab.append((x,b))
	return dict(ab)


def save(bools):
	strout = '|'.join( [k+'_'+str(v) for k, v in
					bools.iteritems()])
	return binascii.hexlify(strout)


data = {
	"hello": True,
	"got x": True
}
print data
ss = save(data)
print ss
out = load(ss)
print out







