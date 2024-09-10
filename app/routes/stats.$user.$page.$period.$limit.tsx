import { json, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { StatsGrid } from "~/components/StatsGrid";
import {
  LimitList,
  PageList,
  PageType,
  PeriodList,
  StatsType,
  url,
  AlbumStats,
  ArtistStats,
  RequestParams,
} from "~/services/lastfm";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.user, "Missing user param");
  invariant(params.page, "Missing page param");
  invariant(params.period, "Missing period param");
  invariant(params.limit, "Missing limit param");

  invariant(
    PageList.map((x) => String(x)).includes(String(params.page)),
    "Invalid page param"
  );
  invariant(PeriodList.includes(String(params.period)), "Invalid period param");
  invariant(LimitList.includes(String(params.limit)), "Invalid limit param");

  const apiURL = url(params.page as PageType, {
    user: params.user,
    period: params.period,
    limit: params.limit,
  });

  const response = await fetch(apiURL);
  const data: StatsType = await response.json();

  return json({ data });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const params = getParams(data?.data);
  return [{ title: getTitle(params) }];
};

export default function UserStats() {
  const { data } = useLoaderData<typeof loader>();

  const list: Array<ArtistStats | AlbumStats> | undefined = data.topartists
    ?.artist
    ? data.topartists?.artist
    : data.topalbums?.album;

  const params = getParams(data);
  const title = getTitle(params);
  const size = params?.perPage;

  return (
    <div className={list ? `` : `page-content`}>
      <div className="title center">{title}</div>
      {list && <StatsGrid list={list} size={size} />}
    </div>
  );
}

function getParams(data: StatsType | undefined): Partial<RequestParams> {
  const params = data?.topartists?.artist
    ? data?.topartists?.["@attr"]
    : data?.topalbums?.["@attr"];

  return params ?? {};
}

function getTitle(params: Partial<RequestParams>) {
  if (!params.user) {
    return `User not found`;
  }
  return `Stats for ${params.user}`;
}
