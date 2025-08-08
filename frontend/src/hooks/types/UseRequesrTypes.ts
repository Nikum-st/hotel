export type SendRequestFn = (
	url: string,
	method?: string,
	data?: unknown,
) => Promise<any>;

export type UseRequestReturn = {
	sendRequest: SendRequestFn;
	error: string | null;
	setError?: React.Dispatch<React.SetStateAction<string | null>>;
};
