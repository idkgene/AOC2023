<article class="day-desc"><h2 id="part2">--- Part Two ---</h2><p>The Elf says they've stopped producing snow because they aren't getting any <em>water</em>! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!</p>
<p>As you continue your walk, the Elf poses a second question: in each game you played, what is the <em>fewest number of cubes of each color</em> that could have been in the bag to make the game possible?</p>
<p>Again consider the example games from earlier:</p>
<pre><code>Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
</code></pre>
<ul>
<li>In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.</li>
<li>Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.</li>
<li>Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.</li>
<li>Game 4 required at least 14 red, 3 green, and 15 blue cubes.</li>
<li>Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.</li>
</ul>
<p>The <em>power</em> of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is <code>48</code>. In games 2-5 it was <code>12</code>, <code>1560</code>, <code>630</code>, and <code>36</code>, respectively. Adding up these five powers produces the sum <code><em>2286</em></code>.</p>
<p>For each game, find the minimum set of cubes that must have been present. <em>What is the sum of the power of these sets?</em></p>
</article>