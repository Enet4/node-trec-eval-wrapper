
export interface TRECEvaluationSet {
	/** Summary of all query runs */
	all?: TRECEvaluation
	/** Evaluation metrics of a single query run */
	[runId: string]: TRECEvaluation
}

export interface TRECEvaluation {
	runid?: string
	/** Total number of documents retrieved over all queries */
	num_ret?: number
	/** Total number of relevant documents over all queries */
	num_rel?: number
	/** Total number of relevant documents retrieved over all queries */
	num_rel_ret?: number
    /** Mean Average Precision (MAP) */
	map?: number
	/** Average Precision. Geometric Mean, q_score=log(MAX(map,.00001)) */
	gm_ap?: number
	/** R-Precision (Precision after R (= num-rel for topic) documents retrieved) */
	Rprec?: number
	/** Binary Preference, top R judged nonrel */
	bpref?: number
	/** Reciprocal rank of top relevant document */
	recip_rank?: number
	/** Interpolated Recall - Precision Averages at 0.00 recall */
	'ircl_prn.0.00'?: number
	/** Interpolated Recall - Precision Averages at 0.10 recall */
	'ircl_prn.0.10'?: number
	/** ircl_prn.0.20 Interpolated Recall - Precision Averages at 0.20 recall */
	'ircl_prn.0.20'?: number
	/** ircl_prn.0.30 Interpolated Recall - Precision Averages at 0.30 recall */
	'ircl_prn.0.30'?: number
	/** ircl_prn.0.40 Interpolated Recall - Precision Averages at 0.40 recall */
	'ircl_prn.0.40'?: number
	/** ircl_prn.0.50 Interpolated Recall - Precision Averages at 0.50 recall */
	'ircl_prn.0.50'?: number
	/** ircl_prn.0.60 Interpolated Recall - Precision Averages at 0.60 recall */
	'ircl_prn.0.60'?: number
	/** ircl_prn.0.70 Interpolated Recall - Precision Averages at 0.70 recall */
	'ircl_prn.0.70'?: number
	/** ircl_prn.0.80 Interpolated Recall - Precision Averages at 0.80 recall */
	'ircl_prn.0.80'?: number
	/** ircl_prn.0.90 Interpolated Recall - Precision Averages at 0.90 recall */
	'ircl_prn.1.00'?: number
	/** ircl_prn.1.00 Interpolated Recall - Precision Averages at 1.00 recall */
	'ircl_prn.0.90'?: number
	/** Precision after 5 docs retrieved */
	P5?: number
	/** Precision after 10 docs retrieved */
	P10?: number
	/** Precision after 15 docs retrieved */
	P15?: number
	/** Precision after 20 docs retrieved */
	P20?: number
	/** Precision after 30 docs retrieved */
	P30?: number
	/** Precision after 100 docs retrieved */
	P100?: number
	/** Precision after 200 docs retrieved */
	P200?: number
	/** Precision after 500 docs retrieved */
	P500?: number
	/** Precision after 1000 docs retrieved */
	P1000?: number
	
	/** other evaluation measures that may not be covered */
	[name:string]: number|string
}
