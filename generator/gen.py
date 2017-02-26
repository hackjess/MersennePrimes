import os

FILE_SIZE = 5000

def gen(n, outDir):
	outDir = os.path.join(outDir, str(n))
	if not os.path.exists(outDir):
		os.makedirs(outDir)
	
	print "Calculating..."
	n = 2**n - 1
	print "Converting to string..."
	s = str(n)
	print "Getting base10 length of number..."
	l = len(s)
	
	print "Store length"
	f = open(os.path.join(outDir,'len'), 'w')
	f.write(str(l))
	f.close()
	
	print "Store chunks"
	pos = 0
	count = 0
	while pos < l:
		f = open(os.path.join(outDir, str(count)), 'wb')
		iter = 0
		while pos < l and iter < FILE_SIZE:
			iter += 1
			out = ( ord(s[pos]) - ord('0') ) << 4
			pos += 1
			if pos < l:
				out += ord(s[pos]) - ord('0')
			else:
				out += 0xF
			pos += 1
			f.write(chr(out))
		count += 1
		f.close()
		
	print "DONE!"
			
list = [2,3,5,7,13,17,19,31,61,89,107,127,521,607,1279,
 2203,2281,3217,4253,4423,9689,9941,11213,19937,
 21701,23209,44497,86243,110503,132049,216091,
 756839,859433,1257787,1398269,2976221,3021377,
 6972593,13466917,20996011,24036583,25964951,
 30402457,32582657,37156667,
 42643801, 43112609, 57885161, 74207281]
 
if raw_input("'Y' for freerun, else custom run: ") == 'Y':
	for i in range(len(list)):
		print i+1, "of", len(list)
		print "Computing", list[i]
		gen(list[i], "output")

else:
	while True:
		i = int(raw_input("Array Index:"))
		print i+1, "of", len(list)
		print "Computing", list[i]
		gen(list[i], "output")