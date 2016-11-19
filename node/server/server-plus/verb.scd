/**
 * https://en.wikibooks.org/wiki/Designing_Sound_in_SuperCollider/Schroeder_reverb
 */
SynthDef("verb", { arg out=0;
  var input, output, delrd, sig, deltimes;

  input = In.ar(out, 2);

	// Read our 4-channel delayed signals back from the feedback loop
	delrd = LocalIn.ar(4);

	// This will be our eventual output, which will also be recirculated
	output = input + delrd[[0,1]];

	sig = output ++ delrd[[2,3]];
	// Cross-fertilise the four delay lines with each other:
	sig = ([ [1,  1,  1,  1],
	         [1, -1,  1, -1],
	         [1,  1, -1, -1],
	         [1, -1, -1,  1]] * sig).sum;
	// Attenutate the delayed signals so they decay:
	sig = sig * [0.4, 0.37, 0.333, 0.3];

	// Here we give delay times in milliseconds, convert to seconds,
	// then compensate with ControlDur for the one-block delay
	// which is always introduced when using the LocalIn/Out fdbk loop
	deltimes = [101, 143, 165, 177] * 0.001 - ControlDur.ir;

	// Apply the delays and send the signals into the feedback loop
	LocalOut.ar(DelayC.ar(sig, deltimes, deltimes));

	// Now let's hear it:
	ReplaceOut.ar(out, output);
});
