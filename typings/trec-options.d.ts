export interface TRECOptions {

	/** In addition to summary evaluation, give evaluation for each query/topic */
	query_eval_wanted?: boolean

	/** Add 'measure' to the lists of measures to calculate and print. If 'measure'
	 * is an array of arrays of strings, then the name of the measure is the first
	 * element of each sub-array, and the following elements are assumed to be a list
	 * of parameters for the measure.
	 * 'measure' can also be a nickname for a set of measures. Current nicknames include:
	 *  - 'official': the main measures often used by TREC
     *  - 'all_trec': all measures calculated with the standard TREC results and rel_info format files.
     *  - 'set': subset of all_trec that calculates unranked values.
     *  - 'prefs': Measures not in all_trec that calculate preference measures.
	 */
	measure?: string | (string | (string|number)[])[]
	
	/** Average over the complete set of queries in the relevance judgements  
     * instead of the queries in the intersection of relevance judgements 
     * and results. Missing queries will contribute a value of 0 to all 
     * evaluation measures (which may or may not be reasonable for a  
     * particular evaluation measure, but is reasonable for standard TREC 
     * measures.) Default is off.
     */
	complete_rel_info_wanted?: boolean

	/** Num indicates the minimum relevance judgement value needed for 
     * a document to be called relevant. Used if rel_info_file contains 
     * relevance judged on a multi-relevance scale.  Default is 1. 
     */	
	level_for_rel?: number

	/** No summary evaluation will be printed */	
	nosummary?: boolean
	
	/** Debug level.  1 and 2 used for measures, 3 and 4 for merging
     * rel_info and results, 5 and 6 for input.  Currently, num can be of the
     * form <num>.<qid> and only qid will be evaluated with debug info printed.
     * Default is 0.
	 */
	Debug_level?: number
	
	/** Number of docs in collection. Default is MAX_LONG. */
	Number_docs_in_coll?: number
	
	/** Max number of docs per topic to use in evaluation (discard rest).
	 * Default is MAX_LONG.
	 */
	Max_retrieved_per_topic?: number
	
	/** Calculate all values only over the judged (either relevant or  
     * nonrelevant) documents.  All unjudged documents are removed from the 
     * retrieved set before any calculations (possibly leaving an empty set). 
     * DO NOT USE, unless you really know what you're doing - very easy to get 
     * reasonable looking numbers in a file that you will later forget were 
     * calculated  with this flag.
	 */
	Judged_docs_only?: boolean
	
	/** The rel_info file is assumed to be in format 'format'.  Current
     * values for 'format' include 'qrels', 'prefs', 'qrels_prefs'.  Note not
     * all measures can be calculated with all formats.
     */
	Rel_info_format?: string
	
	/** The top results_file is assumed to be in format 'format'. Current
     * values for 'format' include 'trec_results'. Note not all measures can be
     * calculated with all formats.
     */
	Results_format?: string

	/** [UNSUPPORTED YET] Zmean_file: Instead of printing the raw score for each measure, print
     * a Z score instead. The score printed will be the deviation from the mean
     * of the raw score, expressed in standard deviations, where the mean and
     * standard deviation for each measure and query are found in Zmean_file.
     * If mean is not in Zmeanfile for a measure and query, -1000000 is printed.
     * Zmean_file format is ascii lines of form: 
     *  qid  measure_name  mean  std_dev
     */
	Zscore?: string
}
